/*
* SPDX-License-Identifier: LGPL-3.0-or-later
* Copyright © 2026 BotForge
*/

import { ForgeClient, ForgeExtension, Logger } from '@tryforge/forgescript';
import { GlobalFonts, Image } from '@napi-rs/canvas';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { basename, join } from 'node:path';
import { fetch, request } from 'undici';
import { description, version } from '../package.json';
import {
    CanvasManager,
    GradientManager,
    ImageManager,
    GIFManager,
    NeuQuantManager,
    httpsRegex,
    LottieManager,
    fontcssRegex,
    urlRegex,
    ComponentManager
} from './classes';

export const SUPPORTED_FONT_FORMATS = ['ttf', 'otf', 'woff', 'woff2'];
export async function registerFonts(fonts: { src: string, name?: string | null }[], log?: boolean) {
    for (const font of fonts) {
        if (font.src.startsWith('url(') || font.src.startsWith('http')) {
            font.src = font.src.replace(urlRegex, '').trim();

            if (httpsRegex.test(font.src)) {
                const { statusCode, headers, body } = await request(font.src, {
                    headers: { 'User-Agent': 'Mozilla/5.0 () Gecko/20100101 Firefox/147.0' }
                });
                if (statusCode >= 400) throw Logger.error(`Failed to fetch font: ${font.src} (${statusCode})`);

                if ((headers['content-type'] as string)?.startsWith('text/')) {
                    const families = [...(await body.text()).matchAll(fontcssRegex)].map(match => {
                        // @ts-expect-error
                        const { url, subset, family = font.name } = match.groups;
                        return { src: url, name: subset?.length ? `${family}-${subset.trim()}` : family };
                    });

                    if (!families.length) throw Logger.error(`Invalid font CSS: ${font.name ?? font.src}`);
                    await registerFonts(families, log);
                } else if (!GlobalFonts.register(Buffer.from(await body.arrayBuffer()), font.name ?? undefined) && log) {
                    Logger.warn(`Failed to register font: '${font.name ?? font.src}'`);
                } else if (log) Logger.info(`Registered a font: ${font.name ?? font.src}`);
                continue;
            }
        }

        if (!existsSync(font.src)) {
            if (log) throw new Error(`Invalid font source: ${font.src}`);
            return;
        }

        if (statSync(font.src).isFile()) {
            let filename = basename(font.src);

            if (!SUPPORTED_FONT_FORMATS.includes(filename.split('.').pop()!)) return;

            filename = font.name ?? filename.slice(0, filename.lastIndexOf('.'));
            if (log && GlobalFonts.has(filename))
                Logger.warn(`Font with name '${filename}' already exists`);

            if (!filename?.length)
                throw new Error(`Font name cannot be empty: ${font.src}`);
            if (filename.includes(','))
                throw new Error(`Font name cannot contain commas: ${filename}`);

            if (!GlobalFonts.register(readFileSync(font.src), filename) && log) {
                Logger.warn(`Failed to register font: ${filename} (${font.src})`);
                continue;
            }
            if (log) Logger.info(`Registered a font: ${filename} (${font.src})`);
        } else registerFonts(readdirSync(font.src).map(x => ({ src: join(font.src, x) })), log);
    }
}

export class ForgeCanvas extends ForgeExtension {
    name = 'forge.canvas';
    description = description;
    version = version;

    public init(client: ForgeClient) {
        this.load(__dirname + '/functions');
        client.preloadImages = new ImageManager();
    }

    public static components = new ComponentManager();
}

Image.prototype.getBuffer = async function () {
    let buffer: Buffer;
    if (this.src instanceof Uint8Array)
        return Buffer.from(this.src);

    if (typeof this.src !== 'string')
        throw new Error('Invalid image source');

    if (this.src.startsWith('data:')) {
        const base64 = this.src.split(',')[1];
        buffer = Buffer.from(base64, 'base64');
    } else if (httpsRegex.test(this.src))
        buffer = Buffer.from(await (await fetch(this.src)).arrayBuffer());
    else buffer = readFileSync(this.src);

    return buffer;
}

declare module '@tryforge/forgescript' {
    interface ForgeClient {
        preloadImages: ImageManager;
    }

    interface Context {
        canvasManager?: CanvasManager;
        gradientManager?: GradientManager;
        imageManager?: ImageManager;
        gifManager?: GIFManager;
        neuquantManager?: NeuQuantManager;
        lottieManager?: LottieManager;
    }
}

declare module '@napi-rs/canvas' {
    interface Image { getBuffer(): Promise<Buffer | undefined> }
}

export * from './classes';
export * from './typings';

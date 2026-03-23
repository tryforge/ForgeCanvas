/*
* SPDX-License-Identifier: LGPL-3.0-or-later
* Copyright © 2026 BotForge
*/

import { CompiledFunction, Context, ForgeClient, Logger } from '@tryforge/forgescript';
import { createCanvas, GlobalFonts, loadImage, Image, Canvas } from '@napi-rs/canvas';
import { Frame, rgbaToHex, hexToRgba, indexedToRgba } from '@gifsx/gifsx';

import { request } from 'undici';

import { join, basename } from 'node:path';
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';

import { ForgeCanvasError, CanvasBuilder, Spans, ImageFormat, ImageManager } from '..';
import textalign from '../functions/text/textAlign';

export const urlRegex = /^url\(['"]?|['"]?\)$/g;
export const fontcssRegex = /\/\*\s*(?<subset>[\w-]+)\s*\*\/[\s\S]*?font-family:\s*['"]?(?<family>[^'";]+)['"]?;[\s\S]*?url\((?<url>[^)]+)\)/g;
export const emojiRegex = /<(a?):(\w+):(\d+)>/y;
export const cacheRegex = /^cache_.*/;
export const wordRegex = /\S+\s*|\s+/g;
export const httpsRegex = /https?:\/\//;
export const fontRegex = /^\s*(?=(?:(?:[-a-z]+\s*){0,2}(italic|oblique))?)(?=(?:(?:[-a-z]+\s*){0,2}(small-caps))?)(?=(?:(?:[-a-z]+\s*){0,2}(bold(?:er)?|lighter|[1-9]00))?)(?:(?:normal|\1|\2|\3)\s*){0,3}((?:xx?-)?(?:small|large)|medium|smaller|larger|[.\d]+(?:\%|in|[cem]m|ex|p[ctx]))(?:\s*\/\s*(normal|[.\d]+(?:\%|in|[cem]m|ex|p[ctx])))?\s*([-,\'\sa-z_.0-9]+?)\s*$/i;
export const filterRegex = /([a-zA-Z-]+)\(([^)]+)\)/g;
export const rgbaRegex = /^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})(\s*,\s*(0|1|0?\.\d+))?\s*\)$/;
export const hexRegex = /^#?([0-9A-Fa-f]{3,4}){1,2}$/;

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

export function validateFont(font: string) {
    const match = fontRegex.exec(font);
    if (!match?.[0]) return ForgeCanvasError.InvalidFontFormat;

    const families = match[6].split(',').map(x => x?.trim());
    for (const family of families)
        if (!GlobalFonts.has(family.replace(/['',]/g, '')))
            return `${ForgeCanvasError.InvalidFont} (${family})`;
    return match;
}

export function parseFilters(str: string) {
    const result = new Array(1);

    let match: RegExpExecArray | null;
    while ((match = filterRegex.exec(str)) !== null) {
        const [raw, filter, value] = match;
        result.push({ filter, value, raw });
    }

    return result;
}

export async function resolveStyle(self: CompiledFunction, ctx: Context, canvas: CanvasBuilder, style: string | undefined | null) {
    if (!style) return '#0';
    const s = style.split('://');
    const args = style.slice(style.indexOf('://') + 3);

    if (s[0] === 'gradient') {
        const gradient = ctx.gradientManager?.get(args);
        if (!gradient) return self.customError(ForgeCanvasError.NoGradient);
        return gradient;
    }

    if (s[0] === 'pattern') {
        const splits = args.split(':'),
            type = splits.shift()?.toLowerCase();
        let x: number | undefined, y: number | undefined;

        if (splits.length > 2) {
            const l = splits.length;
            const xa = parseFloat(splits[l - 2]);
            const ya = parseFloat(splits[l - 1]);
            if (!Number.isNaN(xa) && !Number.isNaN(ya)) {
                x = xa;
                y = ya;
                splits.pop();
                splits.pop();
            }
        }

        const repeat = splits.length && [
            'repeat', 'repeat-x',
            'repeat-y', 'no-repeat'
        ].includes(splits[splits.length - 1])
            ? splits.pop() : null;

        let image: Image | ImageData | Canvas;

        if (type === 'canvas') {
            const canvas_2 = ctx.canvasManager?.get(repeat ? splits.join(':') : splits.join());
            if (!canvas_2) return self.customError(ForgeCanvasError.NoCanvas);

            image = canvas_2.ctx.canvas;
        } else if (type === 'images' && splits[0]?.startsWith('//')) {
            const source = splits.join(':').slice(2);
            const meow = source.startsWith('preload://');
            const img = (meow ? ctx.client.preloadImages : ctx.imageManager)
                ?.get(meow ? source.slice(10) : source);

            if (!img) return self.customError(ForgeCanvasError.NoImage);

            image = img;
        } else image = await (ctx.imageManager ??= new ImageManager()).load(
            repeat ? splits.join(':') : `${type}:${splits.join(':')}`
        );

        const pattern = canvas.ctx.createPattern(image, repeat as any);
        if (x !== undefined && y !== undefined)
            pattern.setTransform(new DOMMatrix().translate(x, y));
        return pattern;
    }

    return (
        hexRegex.test(style) ? style :
            rgbaRegex.test(style) ? rgbaStringToHex(style) :
                Colors[style]
    ) ?? '#0';
}

export async function resolveImage(self: CompiledFunction, ctx: Context, src: string) {
    const splitted = src.split('//');
    const protocol = splitted[0].slice(0, -1);

    let img: Buffer | Image | string = src;
    switch (protocol) {
        case 'rgba':
        case 'rgb':
        case 'hex': {
            const [size, data] = parseArgs(src, splitted[0].length + 2, 2);
            const [width, height] = size.split('x').map(Number);

            const canvas = createCanvas(width, height);
            const context = canvas.getContext('2d');
            const imageData = context.createImageData(width, height);

            imageData.data.set(new Uint8ClampedArray(
                protocol === 'hex'
                    ? hexToRgba(data.split(',').map(x => x.trim()))
                    : protocol === 'rgb'
                        ? data.split(',').map(Number).flatMap((v, i) => {
                            if ((i + 1) % 3 === 0)
                                return [v, 255];
                            return [v];
                        })
                        : data.split(',').map(Number)
            ));

            context.putImageData(imageData, 0, 0);
            img = canvas.toBuffer('image/png');
            break;
        }
        case 'frame': {
            const frame = ctx.gifManager?.getFrame(src.slice(8));
            if (!frame) return self.customError(ForgeCanvasError.NoFrame);

            const { width, height, buffer } = frame;

            const canvas = createCanvas(width, height);
            const context = canvas.getContext('2d');
            const imageData = context.createImageData(width, height);

            imageData.data.set(
                buffer.length === width * height * 4
                    ? buffer : indexedToRgba(
                        Uint8Array.from(buffer),
                        new Uint8Array(frame.palette ?? []),
                        frame.transparent
                    )
            );
            context.putImageData(imageData, 0, 0);

            img = await canvas.encode('png');
            break;
        }
        case 'preload': {
            const image = ctx.client.preloadImages?.get(splitted.slice(1).join('//'));
            if (!image) return self.customError(ForgeCanvasError.NoImage);

            img = image;
            break;
        }
        case 'images': {
            const image = ctx.imageManager?.get(splitted.slice(1).join('//'));
            if (!image) return self.customError(ForgeCanvasError.NoImage);

            img = image;
            break;
        }
        case 'canvas': {
            const canvas = ctx.canvasManager?.get(splitted.slice(1).join('//'));
            if (!canvas) return self.customError(ForgeCanvasError.NoCanvas);

            img = await canvas.encode(ImageFormat.png);
            break;
        }
        default: if (src?.includes('<svg'))
            img = `data:image/svg+xml;base64,${Buffer.from(src)?.toString('base64')}`;
    }

    return await loadImage(img, ctx.imageManager?.loadOptions)
        .catch((e: any) => self.customError(e.toString()));
}

export function rgbaStringToHex(rgba: string) {
    const match = rgba.match(rgbaRegex)!;
    return rgbaToHex(Uint8Array.from([
        Number.parseInt(match[1], 10),
        Number.parseInt(match[2], 10),
        Number.parseInt(match[3], 10),
        match[5] ? Number.parseFloat(match[5]) : 255
    ]), false, true)[0];
}

export async function resolveFrame(self: CompiledFunction, ctx: Context, frame: string, speed: number | undefined | null) {
    switch (frame.substring(0, frame.indexOf(':'))) {
        case 'rgba': {
            const [size, data] = parseArgs(frame, 'rgba://', 2);
            const [width, height] = size.split('x').map(Number);
            return Frame.fromRgba(
                width, height,
                Uint8Array.from(data.split(',').map(Number)),
                speed
            );
        }

        case 'hex': {
            const [size, data] = parseArgs(frame, 'hex://', 2);
            const [width, height] = size.split('x').map(Number);
            return Frame.fromHex(
                width, height,
                data.split(',').map(x => x.trim()),
                speed
            );
        }

        case 'rgb': {
            const [size, data] = parseArgs(frame, 'rgb://', 2);
            const [width, height] = size.split('x').map(Number);
            return Frame.fromRgb(
                width, height,
                Uint8Array.from(data.split(',').map(Number)),
                speed
            );
        }

        case 'indexed': {
            const [size, data] = parseArgs(frame, 'indexed://', 2);
            const [width, height] = size.split('x').map(Number);
            return Frame.fromIndexedPixels(
                width, height,
                Uint8Array.from(data.split(',').map(Number))
            );
        }

        case 'images': {
            const source = frame.slice(9);
            const meow = frame.startsWith('preload://');
            const img = (meow ? ctx.client.preloadImages : ctx.imageManager)
                ?.get(meow ? source.slice(10) : source);

            if (!img) return self.customError(ForgeCanvasError.NoImage);
            return await loadFrame(
                (ctx.imageManager ?? (ctx.imageManager = new ImageManager())),
                img, speed
            );
        }

        case 'canvas': {
            const canvas = ctx.canvasManager?.get(frame.slice(9));
            if (!canvas) return self.customError(ForgeCanvasError.NoCanvas);
            return Frame.fromRgba(
                canvas.width, canvas.height,
                Uint8Array.from(canvas.inner.data()),
                speed
            );
        }

        default: return await loadFrame(
            (ctx.imageManager ?? (ctx.imageManager = new ImageManager())),
            frame, speed
        );
    }
}

export async function parseText(client: ForgeClient, text: string, parseNL?: boolean | null, parseEmoji?: boolean | null): Promise<Spans> {
    if (!text?.trim()?.length) return [];
    if (!parseNL && !parseEmoji) return [text];

    const spans = new Array(0);
    const regex = new RegExp(emojiRegex.source, 'y');

    let cur = '';

    let sI = 0;
    let i = 0;
    while (i < text.length) {
        const c = text[i];

        if (c === '\\') {
            cur += text.slice(sI, i);
            
            i++;
            sI = i;
            i++;
            continue;
        } else if (parseNL && c === '\n') {
            cur += text.slice(sI, i);
            if (cur.length) spans.push(cur);

            spans.push(null);
            cur = '';
            i++;
            sI = i;
            continue;
        } else if (parseEmoji && c === '<') {
            regex.lastIndex = i;
            const match = regex.exec(text);

            if (match) {
                cur += text.slice(sI, i);
                const id = match[3];

                if (cur.length) spans.push(cur);

                spans.push(client.preloadImages.tryGet(`cache_emoji_${id}`, `https://cdn.discordapp.com/emojis/${id}.png`));
                cur = '';

                i += match[0].length;
                sI = i;

                continue;
            }
        }
        i++;
    }

    cur = text.slice(sI, i);
    if (cur.length) spans.push(cur);

    return Promise.all(spans);
}

export async function loadFrame(
    manager: ImageManager | null,
    src: string | URL | Buffer | ArrayBufferLike | Uint8Array | Image,
    speed?: number | null
) {
    const img = manager ? await manager.load(src)
        : await loadImage(src);

    const canvas = createCanvas(img.width, img.height);

    canvas.getContext('2d').drawImage(img, 0, 0);
    return Frame.fromRgba(
        canvas.width, canvas.height,
        Uint8Array.from(canvas.data()),
        speed
    );
}

export function parseArgs(str: string, prefix: string | number, length: number, rest?: boolean) {
    const args = str.slice(typeof prefix === 'string' ? prefix.length : prefix).split(':');
    if (!rest ? args.length !== length : args.length < length)
        throw new Error(`${prefix} expects ${length} arguments`);

    return args;
}

export const Colors: Record<string, string> = {
    White: '#ffffff',
    Aqua: '#1abc9c',
    Green: '#57f287',
    Blue: '#3498db',
    Yellow: '#fee75c',
    Purple: '#9b59b6',
    LuminousVividPink: '#e91e63',
    Fuchsia: '#eb459e',
    Gold: '#f1c40f',
    Orange: '#e67e22',
    Red: '#ed4245',
    RubberDuck: '#FFD700',
    Grey: '#95a5a6',
    Navy: '#34495e',
    DarkAqua: '#11806a',
    DarkGreen: '#1f8b4c',
    DarkBlue: '#206694',
    DarkPurple: '#71368a',
    DarkVividPink: '#ad1457',
    DarkGold: '#c27c0e',
    DarkOrange: '#a84300',
    DarkRed: '#992d22',
    DarkGrey: '#979c9f',
    DarkerGrey: '#7f8c8d',
    LightGrey: '#bcc0c0',
    DarkNavy: '#2c3e50',
    Blurple: '#5865f2',
    Greyple: '#99aab5',
    DarkButNotBlack: '#2c2f33',
    NotQuiteBlack: '#23272a'
};
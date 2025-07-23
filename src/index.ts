import { ForgeExtension, Logger } from '@tryforge/forgescript';
import { GlobalFonts, Image } from '@napi-rs/canvas';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { basename, join } from 'node:path';
import { fetch } from 'undici';
import { description, version } from '../package.json';
import {
    CanvasManager,
    GradientManager,
    ImageManager,
    GIFManager,
    NeuQuantManager
} from './classes';

export async function registerFonts(fonts: { src: string, name?: string | null }[], log: boolean) {
    for (const font of fonts) {
        if (!existsSync(font.src)) {
            if (log) throw new Error(`Invalid font source: ${font.src}`);
            return;
        }

        if (statSync(font.src).isFile()) {
            let filename = basename(font.src);
            if (!['ttf', 'otf', 'woff', 'woff2'].find(x => filename.endsWith(`.${x}`))) 
                return;

            filename = font.name ?? filename.slice(0, filename.lastIndexOf('.'));
            if (log && GlobalFonts.has(filename))
                Logger.warn(`Font with name '${filename}' already exists`);

            if (!filename?.length)
                throw new Error(`Font name cannot be empty: ${font.src}`);
            if (filename.includes(','))
                throw new Error(`Font name cannot contain commas: ${filename}`);

            if (!GlobalFonts.register(readFileSync(font.src), filename) && log)
                return Logger.warn(`Failed to register font: ${filename} (${font.src})`);
            Logger.info(`Registered a font: ${filename} (${font.src})`);
        } else return registerFonts(readdirSync(font.src).map(x => ({ src: join(font.src, x) })), log);
    }
}

export class ForgeCanvas extends ForgeExtension {
    name = 'forge.canvas';
    description = description;
    version = version;

    public init() {
        this.load(__dirname + '/functions');
    }
}

Image.prototype.getBuffer = async function () {
    let buffer: Buffer;
    if (this.src instanceof Uint8Array)
        return Buffer.from(this.src);
    
    if (typeof this.src === 'string') {
        if (this.src.startsWith('data:')) {
            const base64 = this.src.split(',')[1];
            buffer = Buffer.from(base64, 'base64');
        } else if (/https?:\/\//.test(this.src)) {
            const response = await fetch(this.src);
            if (!response.ok) throw new Error(`Failed to fetch image from ${this.src}`);
            buffer = Buffer.from(await response.arrayBuffer());
        } else buffer = readFileSync(this.src);
    } else throw new Error('Invalid image source');

    return buffer;
}

declare module '@tryforge/forgescript' {
    interface Context {
        canvasManager?: CanvasManager;
        gradientManager?: GradientManager;
        imageManager?: ImageManager;
        gifManager?: GIFManager;
        neuquantManager?: NeuQuantManager;
    }
}

declare module '@napi-rs/canvas' {
    interface Image { getBuffer(): Promise<Buffer | undefined> }
}

export * from './classes';
export * from './typings';
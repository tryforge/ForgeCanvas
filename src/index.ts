import { existsSync, readdirSync, statSync } from 'node:fs';
import { basename, join } from 'node:path';
import { GlobalFonts } from '@napi-rs/canvas';
import { ForgeExtension } from '@tryforge/forgescript';
import { version } from '../package.json';
import { Logger } from './classes';

export async function registerFonts(fonts: { src: string, name?: string | null }[], log: boolean) {
    for (const font of fonts) {
        if (!existsSync(font.src))
            throw Logger.log('ERROR', `Invalid font source. (${font.src})`);
    
        if (statSync(font.src).isFile()) {
            let filename = basename(font.src);
            if (!['ttf', 'otf', 'woff', 'woff2'].find(x => filename.endsWith(`.${x}`))) 
                return;
    
            filename = font.name ?? filename.split('.').slice(0, -1).join('.');
            if (log && GlobalFonts.has(filename))
                Logger.log('WARN', `Font with name '${filename}' already exists.`);
            
            GlobalFonts.registerFromPath(font.src, filename);
            if (log) Logger.log('INFO', `Successfully registered '${filename}'.`);
        } else return registerFonts(readdirSync(font.src).map(x => ({ src: join(font.src, x) })), log);
    }
};

export class ForgeCanvas extends ForgeExtension {
    name = 'forge.canvas';
    description = 'A forgescript extension that allows you to create and edit images with ease.';
    version = version;

    public init() {
        this.load(__dirname + '/functions');
    };
};

export * from './classes';
export * from './typings';
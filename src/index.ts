import { GlobalFonts } from '@napi-rs/canvas';
import { ForgeExtension } from '@tryforge/forgescript';
import { existsSync, statSync, readdirSync } from 'node:fs';
import { basename, join } from 'node:path';
import { Logger } from './classes';

export const registerFonts = async (fonts: { src: string, name?: string | null }[]) => 
    fonts.forEach(font => {
        if (!existsSync(font.src))
            throw Error(`Invalid font source. (${font.src})`);
    
        if (statSync(font.src).isFile()) {
            let filename = basename(font.src);
            if (!['ttf', 'otf', 'woff', 'woff2'].find(x => filename.endsWith(`.${x}`))) 
                return;
    
            filename = font.name ?? filename.split('.').slice(0, -1).join('.');
            if (GlobalFonts.has(filename)) Logger.log('WARN', `Font with name '${filename}' already exists.`);
            GlobalFonts.registerFromPath(font.src, filename);
            Logger.log('WARN', `Successfully registered '${filename}'.`);
        } else return registerFonts(readdirSync(font.src).map(x => ({ src: join(font.src, x) })));
    });

export class ForgeCanvas extends ForgeExtension {
    name = 'forge.canvas';
    description = 'A forgescript extension that allows you to create and edit images with ease.';
    version = '1.0.0';

    public init () {
        this.load(__dirname + '/functions');
    };
};

export * from './classes';
export * from './typings';
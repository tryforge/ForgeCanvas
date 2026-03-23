/*
* SPDX-License-Identifier: LGPL-3.0-or-later
* Copyright © 2026 BotForge
*/

import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { loadImage } from '@napi-rs/canvas';

import { writeFileSync } from 'node:fs';

import { ImageManager, ImageFormat, ForgeCanvasError } from '../..';

export default new NativeFunction({
    name: '$saveCanvas',
    aliases: ['$downloadCanvas', '$canvasSave', '$canvasDownload'],
    description: 'Saves a canvas to a file',
    version: '1.1.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'canvas',
            description: 'Name of the canvas',
            type: ArgType.String,
            required: false,
            rest: false
        },
        {
            name: 'path',
            description: 'Path to a directory. (including the canvas file name and extension)',
            type: ArgType.String,
            required: true,
            rest: false
        },
        {
            name: 'format',
            description: 'The image format',
            type: ArgType.Enum,
            enum: ImageFormat,
            required: false,
            rest: false
        }
    ],
    async execute (ctx, [name, path, f]) {
        const canvas = ctx.canvasManager?.getOrCurrent(name);
        
        if (!canvas) return this.customError(ForgeCanvasError.NoCanvas);
        if (!path) return this.customError(ForgeCanvasError.NoPath);

        const format: any = `image/${(typeof f === 'number' ? ImageFormat[f] : f) ?? 'png'}`;

        if (path.startsWith('images://')) {
            if (!ctx.imageManager) ctx.imageManager = new ImageManager();
            ctx.imageManager.set(
                path.slice(9),
                await loadImage(await canvas.encode(format))
            );
        } else writeFileSync(path, await canvas.encode(format));
        return this.success();
    }
});

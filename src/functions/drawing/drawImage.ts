/*
* SPDX-License-Identifier: LGPL-3.0-or-later
* Copyright © 2026 BotForge
*/

import { NativeFunction, ArgType, Return } from '@tryforge/forgescript';
import { FillOrStrokeOrClear, ForgeCanvasError, ImageManager, resolveImage, resolveStyle } from '../..';

export default new NativeFunction({
    name: '$drawImage',
    aliases: ['$placeImage'],
    description: 'Draws an image on a canvas',
    version: '1.0.0',
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
            name: 'src',
            description: 'The image source',
            type: ArgType.String,
            required: true,
            rest: false
        },
        {
            name: 'x',
            description: 'The image start X coordinate',
            type: ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'y',
            description: 'The image start Y coordinate',
            type: ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'width',
            description: 'The image width',
            type: ArgType.Number,
            required: false,
            rest: false
        },
        {
            name: 'height',
            description: 'The image height',
            type: ArgType.Number,
            required: false,
            rest: false
        },
        {
            name: 'radius',
            description: 'The image radius',
            type: ArgType.Number,
            required: false,
            rest: true
        }
    ],
    async execute(ctx, [name, src, x, y, width, height, radius]) {
        const manager = ctx.imageManager instanceof ImageManager ?
            ctx.imageManager : ctx.imageManager = new ImageManager();
        
        const canvas = ctx.canvasManager?.getOrCurrent(name);
        if (!canvas) return this.customError(ForgeCanvasError.NoCanvas);

        width = num(width);
        height = num(height);

        const img = await resolveImage(this, ctx, src);
        if (img instanceof Return) {
            const style = await resolveStyle(this, ctx, canvas, src);
            if (style instanceof Return) return img;

            canvas.ctx.fillStyle = style;
            canvas.rect(
                FillOrStrokeOrClear.fill,
                x, y, width, height,
                radius.length === 1 ? radius[0] : radius
            );
            return this.success();
        };

        await canvas.drawImage(
            manager,
            img, x, y,
            width, height,
            radius.length === 1
                ? radius[0] : radius
        );
        return this.success();
    }
});

const num = (x: string | number | null) => typeof x === 'string' || !x ? null : x;

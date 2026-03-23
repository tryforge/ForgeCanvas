/*
* SPDX-License-Identifier: LGPL-3.0-or-later
* Copyright © 2026 BotForge
*/

import { NativeFunction, ArgType, Return } from '@tryforge/forgescript';
import { FillOrStrokeOrClear, ForgeCanvasError, ImageManager, resolveImage, resolveStyle } from '../..';

export default new NativeFunction({
    name: '$drawImageArea',
    aliases: ['$placeImageArea', '$drawImageRect', '$drawImageRect'],
    description: 'Draws a specific area of an image on the canvas',
    version: '1.3.0',
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
            name: 'srcX',
            description: 'The image area\'s start X coordinate',
            type: ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'srcY',
            description: 'The image area\'s start X coordinate',
            type: ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'srcWidth',
            description: 'The image area width',
            type: ArgType.Number,
            required: false,
            rest: false
        },
        {
            name: 'srcHeight',
            description: 'The image area height',
            type: ArgType.Number,
            required: false,
            rest: false
        },
        {
            name: 'x',
            description: 'The image destination start X coordinate',
            type: ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'y',
            description: 'The image destionation start Y coordinate',
            type: ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'width',
            description: 'The drawn image width',
            type: ArgType.Number,
            required: false,
            rest: false
        },
        {
            name: 'height',
            description: 'The drawn image height',
            type: ArgType.Number,
            required: false,
            rest: false
        },
        {
            name: 'radius',
            description: 'The drawn image radius',
            type: ArgType.Number,
            required: false,
            rest: true
        }
    ],
    async execute(ctx, [name, src, srcx, srcy, srcwidth, srcheight, x, y, width, height, radius]) {
        const manager = ctx.imageManager instanceof ImageManager ?
            ctx.imageManager : ctx.imageManager = new ImageManager();
        
        const canvas = ctx.canvasManager?.getOrCurrent(name);
        if (!canvas) return this.customError(ForgeCanvasError.NoCanvas);

        srcwidth = num(srcwidth);
        srcheight = num(srcheight);
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
                ? radius[0] : radius,
            srcx, srcy,
            srcwidth, srcheight
        );
        return this.success();
    }
});

const num = (x: string | number | null) => typeof x === 'string' || !x ? null : x;

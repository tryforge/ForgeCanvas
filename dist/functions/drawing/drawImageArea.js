"use strict";
/*
* SPDX-License-Identifier: LGPL-3.0-or-later
* Copyright © 2026 BotForge
*/
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("../..");
exports.default = new forgescript_1.NativeFunction({
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
            type: forgescript_1.ArgType.String,
            required: false,
            rest: false
        },
        {
            name: 'src',
            description: 'The image source',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false
        },
        {
            name: 'srcX',
            description: 'The image area\'s start X coordinate',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'srcY',
            description: 'The image area\'s start X coordinate',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'srcWidth',
            description: 'The image area width',
            type: forgescript_1.ArgType.Number,
            required: false,
            rest: false
        },
        {
            name: 'srcHeight',
            description: 'The image area height',
            type: forgescript_1.ArgType.Number,
            required: false,
            rest: false
        },
        {
            name: 'x',
            description: 'The image destination start X coordinate',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'y',
            description: 'The image destionation start Y coordinate',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'width',
            description: 'The drawn image width',
            type: forgescript_1.ArgType.Number,
            required: false,
            rest: false
        },
        {
            name: 'height',
            description: 'The drawn image height',
            type: forgescript_1.ArgType.Number,
            required: false,
            rest: false
        },
        {
            name: 'radius',
            description: 'The drawn image radius',
            type: forgescript_1.ArgType.Number,
            required: false,
            rest: true
        }
    ],
    async execute(ctx, [name, src, srcx, srcy, srcwidth, srcheight, x, y, width, height, radius]) {
        const manager = ctx.imageManager instanceof __1.ImageManager ?
            ctx.imageManager : ctx.imageManager = new __1.ImageManager();
        const canvas = ctx.canvasManager?.getOrCurrent(name);
        if (!canvas)
            return this.customError(__1.ForgeCanvasError.NoCanvas);
        srcwidth = num(srcwidth);
        srcheight = num(srcheight);
        width = num(width);
        height = num(height);
        const img = await (0, __1.resolveImage)(this, ctx, src);
        if (img instanceof forgescript_1.Return) {
            const style = await (0, __1.resolveStyle)(this, ctx, canvas, src);
            if (style instanceof forgescript_1.Return)
                return img;
            canvas.ctx.fillStyle = style;
            canvas.rect(__1.FillOrStrokeOrClear.fill, x, y, width, height, radius.length === 1 ? radius[0] : radius);
            return this.success();
        }
        ;
        await canvas.drawImage(manager, img, x, y, width, height, radius.length === 1
            ? radius[0] : radius, srcx, srcy, srcwidth, srcheight);
        return this.success();
    }
});
const num = (x) => typeof x === 'string' || !x ? null : x;

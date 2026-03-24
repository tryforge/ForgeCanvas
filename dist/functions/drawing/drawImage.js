"use strict";
/*
* SPDX-License-Identifier: LGPL-3.0-or-later
* Copyright © 2026 BotForge
*/
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("../..");
exports.default = new forgescript_1.NativeFunction({
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
            name: 'x',
            description: 'The image start X coordinate',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'y',
            description: 'The image start Y coordinate',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'width',
            description: 'The image width',
            type: forgescript_1.ArgType.Number,
            required: false,
            rest: false
        },
        {
            name: 'height',
            description: 'The image height',
            type: forgescript_1.ArgType.Number,
            required: false,
            rest: false
        },
        {
            name: 'radius',
            description: 'The image radius',
            type: forgescript_1.ArgType.Number,
            required: false,
            rest: true
        }
    ],
    async execute(ctx, [name, src, x, y, width, height, radius]) {
        const manager = ctx.imageManager instanceof __1.ImageManager ?
            ctx.imageManager : ctx.imageManager = new __1.ImageManager();
        const canvas = ctx.canvasManager?.getOrCurrent(name);
        if (!canvas)
            return this.customError(__1.ForgeCanvasError.NoCanvas);
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
            ? radius[0] : radius);
        return this.success();
    }
});
const num = (x) => typeof x === 'string' || !x ? null : x;

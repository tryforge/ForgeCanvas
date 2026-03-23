"use strict";
/*
* SPDX-License-Identifier: LGPL-3.0-or-later
* Copyright © 2026 BotForge
*/
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("../..");
exports.default = new forgescript_1.NativeFunction({
    name: '$imageSize',
    aliases: ['$imgSize', '$imageDimensions'],
    description: 'Returns the image\'s size',
    version: '1.1.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'path',
            description: 'The image path or name (via images://name or, preload://name, if global)',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false
        },
        {
            name: 'property',
            description: 'Whether to return the image\'s width or height; Returns both as JSON if empty',
            type: forgescript_1.ArgType.Enum,
            enum: __1.WidthOrHeight,
            required: false,
            rest: false
        }
    ],
    async execute(ctx, [path, property]) {
        let image;
        if (path.startsWith('images://')) {
            path = path.slice(9);
            let manager = ctx.imageManager;
            if (path.startsWith('preload://')) {
                path = path.slice(10);
                manager = ctx.client.preloadImages;
            }
            image = manager?.get(path);
        }
        else if (path.startsWith('preload://'))
            image = ctx.client.preloadImages.get(path);
        else
            image = await ctx.imageManager?.load(path);
        if (!image)
            return this.customError(__1.ForgeCanvasError.ImageFail);
        return this.success(property !== null && property !== undefined // @ts-ignore
            ? image[__1.WidthOrHeight[(typeof property === 'string' ? __1.WidthOrHeight[property] : property)]]
            : JSON.stringify({ width: image.width, height: image.height }));
    }
});

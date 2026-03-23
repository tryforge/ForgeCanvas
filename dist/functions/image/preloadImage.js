"use strict";
/*
* SPDX-License-Identifier: LGPL-3.0-or-later
* Copyright © 2026 BotForge
*/
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("../..");
exports.default = new forgescript_1.NativeFunction({
    name: '$preloadImage',
    description: 'Loads an image globally; Recommended for images that never change. Use preload://name to draw',
    version: '1.3.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'name',
            description: 'The image name',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false
        },
        {
            name: 'src',
            description: 'The image source',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false
        }
    ],
    async execute(ctx, [name, src]) {
        const img = await (0, __1.resolveImage)(this, ctx, src);
        if (img instanceof forgescript_1.Return)
            return img;
        ctx.client.preloadImages.set(name, img);
        return this.success();
    }
});

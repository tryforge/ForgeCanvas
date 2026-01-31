"use strict";
/*
* SPDX-License-Identifier: LGPL-3.0-or-later
* Copyright © 2026 BotForge
*/
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const canvas_1 = require("@napi-rs/canvas");
const classes_1 = require("../../classes");
exports.default = new forgescript_1.NativeFunction({
    name: '$imageBuffer',
    description: 'Stores the image\'s buffer.',
    version: '1.2.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'variable name',
            description: 'The variable to load it to, accessed with $env[name]',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false,
            version: '1.3.0'
        },
        {
            name: 'path',
            description: 'The image path.',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false
        }
    ],
    async execute(ctx, [vname, path]) {
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
        else
            image = await (0, canvas_1.loadImage)(path);
        if (!image)
            return this.customError(classes_1.FCError.NoImage);
        ctx.setEnvironmentKey(vname, await image.getBuffer());
        return this.success();
    }
});

"use strict";
/*
* SPDX-License-Identifier: LGPL-3.0-or-later
* Copyright © 2026 BotForge
*/
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: '$deleteImage',
    aliases: ['$removeImage'],
    description: 'Deletes the image.',
    version: '1.2.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'name',
            description: 'Name of the image.',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false
        }
    ],
    execute(ctx, [name]) {
        let manager = ctx.imageManager;
        if (name.startsWith('preload://')) {
            name = name.slice(10);
            manager = ctx.client.preloadImages;
        }
        manager?.remove(name);
        return this.success();
    }
});

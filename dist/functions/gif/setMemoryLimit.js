"use strict";
/*
* SPDX-License-Identifier: LGPL-3.0-or-later
* Copyright © 2026 BotForge
*/
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const gifsx_1 = require("@gifsx/gifsx");
const __1 = require("../..");
exports.default = new forgescript_1.NativeFunction({
    name: '$setMemoryLimit',
    aliases: ['$setRAMLimit'],
    description: 'Configure the memory limit for the GIF Decoder',
    version: '1.2.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'name',
            description: 'Name of the Decode Options',
            type: forgescript_1.ArgType.String,
            required: false,
            rest: false
        },
        {
            name: 'limit',
            description: 'Memory limit in bytes',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        }
    ],
    execute(ctx, [name, limit]) {
        const manager = ctx.gifManager instanceof __1.GIFManager ?
            ctx.gifManager : ctx.gifManager = new __1.GIFManager();
        if (!name && !manager.currentOptions)
            manager.currentOptions = new gifsx_1.DecodeOptions();
        const options = name
            ? manager.getDecodeOptions(name)
            : manager.currentOptions;
        if (options)
            options.setMemoryLimit(limit);
        return this.success();
    }
});

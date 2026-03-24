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
    name: '$skipFrameDecoding',
    aliases: ['$skipFrameDecode'],
    description: 'Configure whether to skip decoding frames',
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
            name: 'boolean',
            description: 'Whether to skip decoding frames',
            type: forgescript_1.ArgType.Boolean,
            required: true,
            rest: false
        }
    ],
    execute(ctx, [name, bool]) {
        const manager = ctx.gifManager instanceof __1.GIFManager ?
            ctx.gifManager : ctx.gifManager = new __1.GIFManager();
        if (!name && !manager.currentOptions)
            manager.currentOptions = new gifsx_1.DecodeOptions();
        const options = name
            ? manager.getDecodeOptions(name)
            : manager.currentOptions;
        if (options)
            options.skipFrameDecoding(bool);
        return this.success();
    }
});

"use strict";
/*
* SPDX-License-Identifier: LGPL-3.0-or-later
* Copyright © 2026 BotForge
*/
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("../..");
exports.default = new forgescript_1.NativeFunction({
    name: '$setEncoderLoops',
    aliases: [
        '$setEncoderRepeat',
        '$setGIFEncoderRepeat',
        '$setGIFEncoderLoops',
        '$setLoops',
        '$setRepeat'
    ],
    description: 'Sets the number of loops for the GIF Encoder',
    version: '1.2.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'gif',
            description: 'Name of the GIF',
            type: forgescript_1.ArgType.String,
            required: false,
            rest: false
        },
        {
            name: 'loops',
            description: 'Number of loops',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        }
    ],
    execute(ctx, [name, loops]) {
        const gif = ctx.gifManager?.getEncoderOrCurrent(name);
        if (!gif)
            return this.customError(__1.ForgeCanvasError.NoEncoder);
        gif.setRepeat(loops);
        return this.success();
    }
});

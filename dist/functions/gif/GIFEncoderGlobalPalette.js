"use strict";
/*
* SPDX-License-Identifier: LGPL-3.0-or-later
* Copyright © 2026 BotForge
*/
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("../..");
exports.default = new forgescript_1.NativeFunction({
    name: '$GIFEncoderGlobalPalette',
    aliases: ['$encoderGlobalPalette', '$globalPalette'],
    description: 'Gets the global palette of the GIF Encoder',
    version: '1.2.0',
    brackets: false,
    unwrap: true,
    args: [
        {
            name: 'gif',
            description: 'Name of the GIF',
            type: forgescript_1.ArgType.String,
            required: false,
            rest: false
        }
    ],
    execute(ctx, [name]) {
        const gif = ctx.gifManager?.getEncoderOrCurrent(name);
        if (!gif)
            return this.customError(__1.ForgeCanvasError.NoEncoder);
        return this.success(gif.palette !== null
            ? `[${Array.from(gif.palette).join(', ')}]` : null);
    }
});

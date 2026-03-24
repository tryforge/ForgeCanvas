"use strict";
/*
* SPDX-License-Identifier: LGPL-3.0-or-later
* Copyright © 2026 BotForge
*/
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("../..");
exports.default = new forgescript_1.NativeFunction({
    name: '$lineDashOffset',
    description: 'Sets or returns the line dash offset in a canvas',
    version: '1.0.0',
    brackets: false,
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
            name: 'offset',
            description: 'The new offset',
            type: forgescript_1.ArgType.Number,
            required: false,
            rest: false
        }
    ],
    execute(ctx, [name, offset]) {
        const canvas = ctx.canvasManager?.getOrCurrent(name)?.ctx;
        if (!canvas)
            return this.customError(__1.ForgeCanvasError.NoCanvas);
        return this.success(offset
            ? (canvas.lineDashOffset = offset, undefined)
            : canvas.lineDashOffset);
    }
});

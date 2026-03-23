"use strict";
/*
* SPDX-License-Identifier: LGPL-3.0-or-later
* Copyright © 2026 BotForge
*/
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("../..");
exports.default = new forgescript_1.NativeFunction({
    name: '$scale',
    description: 'Adds a scaling transformation to the canvas',
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
            name: 'x',
            description: 'Scaling factor in the horizontal direction',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'y',
            description: 'Scaling factor in the vertical direction',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        }
    ],
    execute(ctx, [name, x, y]) {
        const canvas = ctx.canvasManager?.getOrCurrent(name);
        if (!canvas)
            return this.customError(__1.ForgeCanvasError.NoCanvas);
        canvas.ctx.scale(x, y);
        return this.success();
    }
});

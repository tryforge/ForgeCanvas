"use strict";
/*
* SPDX-License-Identifier: LGPL-3.0-or-later
* Copyright © 2026 BotForge
*/
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: '$closePath',
    aliases: ['$endPath'],
    description: 'Adds a straight line from the current point to the start of the current path',
    version: '1.0.0',
    unwrap: true,
    brackets: false,
    args: [
        {
            name: 'canvas',
            description: 'Name of the canvas',
            type: forgescript_1.ArgType.String,
            required: false,
            rest: false
        }
    ],
    execute(ctx, [name]) {
        const canvas = ctx.canvasManager?.getOrCurrent(name);
        if (!canvas)
            return this.customError("No canvas with provided name found" /* ForgeCanvasError.NoCanvas */);
        canvas.ctx.closePath();
        return this.success();
    }
});

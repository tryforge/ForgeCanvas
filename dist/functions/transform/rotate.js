"use strict";
/*
* SPDX-License-Identifier: LGPL-3.0-or-later
* Copyright © 2026 BotForge
*/
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("../..");
exports.default = new forgescript_1.NativeFunction({
    name: '$rotate',
    aliases: ['$rotateCanvas', '$rotation'],
    description: 'Sets the rotation in the canvas',
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
            name: 'angle',
            description: 'The rotation angle',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        }
    ],
    execute(ctx, [name, angle]) {
        const canvas = ctx.canvasManager?.getOrCurrent(name);
        if (!canvas)
            return this.customError(__1.ForgeCanvasError.NoCanvas);
        canvas.rotate(angle);
        return this.success();
    }
});

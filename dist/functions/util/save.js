"use strict";
/*
* SPDX-License-Identifier: LGPL-3.0-or-later
* Copyright © 2026 BotForge
*/
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("../..");
exports.default = new forgescript_1.NativeFunction({
    name: '$save',
    description: 'Saves the entire state of the canvas',
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
        }
    ],
    execute(ctx, [name]) {
        const canvas = ctx.canvasManager?.getOrCurrent(name);
        if (!canvas)
            return this.customError(__1.ForgeCanvasError.NoCanvas);
        canvas.ctx.save();
        return this.success();
    }
});

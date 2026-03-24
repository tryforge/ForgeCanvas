"use strict";
/*
* SPDX-License-Identifier: LGPL-3.0-or-later
* Copyright © 2026 BotForge
*/
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("../..");
exports.default = new forgescript_1.NativeFunction({
    name: '$canvasBuffer',
    description: 'Stores the current canvas buffer',
    version: '1.2.0',
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
            name: 'variable name',
            description: 'The variable to load it to, accessed with $env[name]',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false,
            version: '1.3.0'
        },
        {
            name: 'format',
            description: 'The image format',
            type: forgescript_1.ArgType.Enum,
            enum: __1.ImageFormat,
            required: false,
            rest: false
        }
    ],
    async execute(ctx, [name, vname, f]) {
        const canvas = ctx.canvasManager?.getOrCurrent(name);
        if (!canvas)
            return this.customError(__1.ForgeCanvasError.NoCanvas);
        ctx.setEnvironmentKey(vname, await canvas.encode(f));
        return this.success();
    }
});

"use strict";
/*
* SPDX-License-Identifier: LGPL-3.0-or-later
* Copyright © 2026 BotForge
*/
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("../..");
exports.default = new forgescript_1.NativeFunction({
    name: '$canvasDataUrl',
    description: 'Returns buffer of a canvas',
    version: '1.2.2',
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
            name: 'format',
            description: 'The image format',
            type: forgescript_1.ArgType.Enum,
            enum: __1.ImageFormat,
            required: false,
            rest: false
        }
    ],
    async execute(ctx, [name, f]) {
        const canvas = ctx.canvasManager?.getOrCurrent(name);
        if (!canvas)
            return this.customError(__1.ForgeCanvasError.NoCanvas);
        return this.success(await canvas.dataUrl(f));
    }
});

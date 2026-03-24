"use strict";
/*
* SPDX-License-Identifier: LGPL-3.0-or-later
* Copyright © 2026 BotForge
*/
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("../..");
exports.default = new forgescript_1.NativeFunction({
    name: '$setTransform',
    description: 'Sets the current transformation',
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
            name: 'a',
            description: 'The cell in the first row and first column of the matrix',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'b',
            description: 'The cell in the second row and first column of the matrix',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'c',
            description: 'The cell in the first row and second column of the matrix',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'd',
            description: 'The cell in the second row and second column of the matrix',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'e',
            description: 'The cell in the first row and third column of the matrix',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'f',
            description: 'The cell in the second row and third column of the matrix',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        }
    ],
    execute(ctx, [name, ...matrix]) {
        const canvas = ctx.canvasManager?.getOrCurrent(name);
        if (!canvas)
            return this.customError(__1.ForgeCanvasError.NoCanvas);
        canvas.ctx.setTransform(...matrix);
        return this.success();
    }
});

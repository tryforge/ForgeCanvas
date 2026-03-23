"use strict";
/*
* SPDX-License-Identifier: LGPL-3.0-or-later
* Copyright © 2026 BotForge
*/
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("../..");
exports.default = new forgescript_1.NativeFunction({
    name: '$quadraticCurveTo',
    aliases: ['$quadraticCurve', '$quadraticLineTo'],
    description: 'Draws a quadratic Bézier curve in the current path',
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
            name: 'cx',
            description: 'The X coordinate of the control point',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'cy',
            description: 'The Y coordinate of the control point',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'x',
            description: 'The X coordinate of the end point',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'y',
            description: 'The Y coordinate of the end point',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        }
    ],
    execute(ctx, [name, cx, cy, x, y]) {
        const canvas = ctx.canvasManager?.getOrCurrent(name);
        if (!canvas)
            return this.customError(__1.ForgeCanvasError.NoCanvas);
        canvas.ctx.quadraticCurveTo(cx, cy, x, y);
        return this.success();
    }
});

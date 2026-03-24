/*
* SPDX-License-Identifier: LGPL-3.0-or-later
* Copyright © 2026 BotForge
*/

import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { ForgeCanvasError } from '../..';

export default new NativeFunction({
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
            type: ArgType.String,
            required: false,
            rest: false
        },
        {
            name: 'cx',
            description: 'The X coordinate of the control point',
            type: ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'cy',
            description: 'The Y coordinate of the control point',
            type: ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'x',
            description: 'The X coordinate of the end point',
            type: ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'y',
            description: 'The Y coordinate of the end point',
            type: ArgType.Number,
            required: true,
            rest: false
        }
    ],
    execute (ctx, [name, cx, cy, x, y]) {
        const canvas = ctx.canvasManager?.getOrCurrent(name);
        if (!canvas) return this.customError(ForgeCanvasError.NoCanvas);

        canvas.ctx.quadraticCurveTo(cx, cy, x, y);
        return this.success();
    }
});
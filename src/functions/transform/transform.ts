/*
* SPDX-License-Identifier: LGPL-3.0-or-later
* Copyright © 2026 BotForge
*/

import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { ForgeCanvasError } from '../..';

export default new NativeFunction({
    name: '$transform',
    description: 'Multiplies the current transformation',
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
            name: 'a',
            description: 'The cell in the first row and first column of the matrix',
            type: ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'b',
            description: 'The cell in the second row and first column of the matrix',
            type: ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'c',
            description: 'The cell in the first row and second column of the matrix',
            type: ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'd',
            description: 'The cell in the second row and second column of the matrix',
            type: ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'e',
            description: 'The cell in the first row and third column of the matrix',
            type: ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'f',
            description: 'The cell in the second row and third column of the matrix',
            type: ArgType.Number,
            required: true,
            rest: false
        }
    ],
    execute (ctx, [name, ...matrix]) {
        const canvas = ctx.canvasManager?.getOrCurrent(name);
        if (!canvas) return this.customError(ForgeCanvasError.NoCanvas);

        canvas.ctx.transform(...matrix);
        return this.success();
    }
});
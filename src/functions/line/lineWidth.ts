/*
* SPDX-License-Identifier: LGPL-3.0-or-later
* Copyright © 2026 BotForge
*/

import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { ForgeCanvasError } from '../..';

export default new NativeFunction({
    name: '$lineWidth',
    aliases: ['$strokeWidth'],
    description: 'Sets or returns the line width in a canvas',
    version: '1.0.0',
    brackets: false,
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
            name: 'width',
            description: 'The new line width',
            type: ArgType.Number,
            required: false,
            rest: false
        }
    ],
    execute (ctx, [name, width]) {
        const canvas = ctx.canvasManager?.getOrCurrent(name);

        if (!canvas) return this.customError(ForgeCanvasError.NoCanvas);
        if (!width) return this.success(canvas.ctx.lineWidth);

        canvas.ctx.lineWidth = width;
        return this.success();
    }
});
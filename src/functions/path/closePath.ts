/*
* SPDX-License-Identifier: LGPL-3.0-or-later
* Copyright © 2026 BotForge
*/

import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { ForgeCanvasError } from '../..';

export default new NativeFunction({
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
            type: ArgType.String,
            required: false,
            rest: false
        }
    ],
    execute (ctx, [name]) {
        const canvas = ctx.canvasManager?.getOrCurrent(name);
        if (!canvas) return this.customError(ForgeCanvasError.NoCanvas);

        canvas.ctx.closePath();
        return this.success();
    }
});
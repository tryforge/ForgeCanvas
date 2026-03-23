/*
* SPDX-License-Identifier: LGPL-3.0-or-later
* Copyright © 2026 BotForge
*/

import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { ForgeCanvasError } from '../..';

export default new NativeFunction({
    name: '$translate',
    description: 'Adds a translation transformation',
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
            name: 'x',
            description: 'Distance to move in the horizontal direction',
            type: ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'y',
            description: 'Distance to move in the vertical direction',
            type: ArgType.Number,
            required: true,
            rest: false
        }
    ],
    execute (ctx, [name, x, y]) {
        const canvas = ctx.canvasManager?.getOrCurrent(name);
        if (!canvas) return this.customError(ForgeCanvasError.NoCanvas);

        canvas.ctx.translate(x, y);
        return this.success();
    }
});
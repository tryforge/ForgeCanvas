/*
* SPDX-License-Identifier: LGPL-3.0-or-later
* Copyright © 2026 BotForge
*/

import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { ForgeCanvasError } from '../..';

export default new NativeFunction({
    name: '$opacity',
    aliases: ['$globalAlpha', '$alpha'],
    description: 'Sets or returns the opacity in a canvas',
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
            name: 'opacity',
            description: 'The new opacity',
            type: ArgType.Number,
            required: false,
            rest: false
        }
    ],
    execute (ctx, [name, opacity]) {
        const canvas = ctx.canvasManager?.getOrCurrent(name)?.ctx;
        if (!canvas) return this.customError(ForgeCanvasError.NoCanvas);

        return this.success(opacity !== null && opacity !== undefined
            ? (canvas.globalAlpha = opacity / 100, undefined)
            : canvas.globalAlpha
        );
    }
});

/*
* SPDX-License-Identifier: LGPL-3.0-or-later
* Copyright © 2026 BotForge
*/

import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { ForgeCanvasError } from '../..';

export default new NativeFunction({
    name: '$arcTo',
    description: 'Adds a circular arc in the current path',
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
            name: 'x1',
            description: 'The X coordinate of the arc\'s start point',
            type: ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'y1',
            description: 'The Y coordinate of the arc\'s start point',
            type: ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'x2',
            description: 'The X coordinate of the arc\'s end point',
            type: ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'y2',
            description: 'The Y coordinate of the arc\'s end point',
            type: ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'radius',
            description: 'The arc\'s radius. Must be non-negative',
            type: ArgType.Number,
            required: true,
            rest: false
        }
    ],
    execute (ctx, [name, ...args]) {
        const canvas = ctx.canvasManager?.getOrCurrent(name);
        if (!canvas) return this.customError(ForgeCanvasError.NoCanvas);

        canvas.ctx.arcTo(...args);
        return this.success();
    }
});

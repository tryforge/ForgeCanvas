/*
* SPDX-License-Identifier: LGPL-3.0-or-later
* Copyright © 2026 BotForge
*/

import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { ForgeCanvasError, FillRule } from '../..';

export default new NativeFunction({
    name: '$clip',
    aliases: ['$clipCanvas', '$canvasClip'],
    description: 'Turns the current path into the current clipping region',
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
            name: 'fillRule',
            description: 'The fill rule',
            type: ArgType.Enum,
            enum: FillRule,
            required: false,
            rest: false
        }
    ],
    execute (ctx, [name, rule]) {
        const canvas = ctx.canvasManager?.getOrCurrent(name);
        if (!canvas) return this.customError(ForgeCanvasError.NoCanvas);

        canvas.ctx.clip((typeof rule === 'number' ? FillRule[rule] : rule) as CanvasFillRule);
        return this.success();
    }
});
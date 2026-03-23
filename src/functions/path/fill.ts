/*
* SPDX-License-Identifier: LGPL-3.0-or-later
* Copyright © 2026 BotForge
*/

import { NativeFunction, ArgType, Return } from '@tryforge/forgescript';
import { ForgeCanvasError, FillRule, resolveStyle } from '../..';

export default new NativeFunction({
    name: '$fill',
    aliases: ['$pathFill', '$fillPath'],
    description: 'Fills the current path',
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
            name: 'style',
            description: 'The style (color/gradient/pattern)',
            type: ArgType.String,
            required: true,
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
    async execute (ctx, [name, style, rule]) {
        const canvas = ctx.canvasManager?.getOrCurrent(name);
        if (!canvas) return this.customError(ForgeCanvasError.NoCanvas);

        const oldstyle = canvas.ctx.fillStyle,
              s = await resolveStyle(this, ctx, canvas, style);
        if (s instanceof Return) return s;

        canvas.ctx.fillStyle = s;
        canvas.ctx.fill((typeof rule === 'number' ? FillRule[rule] : rule) as CanvasFillRule);
        canvas.ctx.fillStyle = oldstyle;

        return this.success();
    }
});
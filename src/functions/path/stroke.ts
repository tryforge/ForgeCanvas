/*
* SPDX-License-Identifier: LGPL-3.0-or-later
* Copyright © 2026 BotForge
*/

import { NativeFunction, ArgType, Return } from '@tryforge/forgescript';
import { ForgeCanvasError, resolveStyle } from '../..';

export default new NativeFunction({
    name: '$stroke',
    aliases: ['$strokePath', '$pathStroke'],
    description: 'Strokes (outlines) the current path',
    version: '1.1.0',
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
        }
    ],
    async execute (ctx, [name, style]) {
        const canvas = ctx.canvasManager?.getOrCurrent(name);
        if (!canvas) return this.customError(ForgeCanvasError.NoCanvas);

        const s = await resolveStyle(this, ctx, canvas, style);
        if (s instanceof Return) return s;

        canvas.ctx.strokeStyle = s;
        canvas.ctx.stroke();

        return this.success();
    }
});

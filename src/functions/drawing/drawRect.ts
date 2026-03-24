/*
* SPDX-License-Identifier: LGPL-3.0-or-later
* Copyright © 2026 BotForge
*/

import { NativeFunction, ArgType, Return } from '@tryforge/forgescript';
import { ForgeCanvasError, FillOrStrokeOrClear, resolveStyle } from '../..';

export default new NativeFunction({
    name: '$drawRect',
    aliases: ['$placeRect', '$rectangle', '$rect'],
    description: 'Draws a rectangle on a canvas',
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
            name: 'type',
            description: 'The rectangle type',
            type: ArgType.Enum,
            enum: FillOrStrokeOrClear,
            required: true,
            rest: false
        },
        {
            name: 'style',
            description: 'The style. (color/gradient/pattern)',
            type: ArgType.String,
            required: false,
            rest: false
        },
        {
            name: 'x',
            description: 'The rect start X coordinate',
            type: ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'y',
            description: 'The rect start Y coordinate',
            type: ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'width',
            description: 'The rect width',
            type: ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'height',
            description: 'The rect height',
            type: ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'radius',
            description: 'The rect radius',
            type: ArgType.Number,
            required: false,
            rest: true
        }
    ],
    async execute (ctx, [name, t, style, x, y, width, height, radius]) {
        const canvas = ctx.canvasManager?.getOrCurrent(name);
        if (!canvas) return this.customError(ForgeCanvasError.NoCanvas);

        if (!style?.length && (t === FillOrStrokeOrClear.fill || t === FillOrStrokeOrClear.stroke))
            return this.customError(ForgeCanvasError.NoStyle);

        const s = await resolveStyle(this, ctx, canvas, style);
        if (s instanceof Return) return s;

        canvas.ctx[t === FillOrStrokeOrClear.fill ? 'fillStyle' : 'strokeStyle'] = s;
        canvas.rect(
            t, x, y,
            width, height,
            radius.length === 1
                ? radius[0] : radius
        );

        return this.success();
    }
});

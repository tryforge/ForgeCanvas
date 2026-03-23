/*
* SPDX-License-Identifier: LGPL-3.0-or-later
* Copyright © 2026 BotForge
*/

import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { ForgeCanvasError, MeasureTextProperty, validateFont } from '../..';

export default new NativeFunction({
    name: '$measureText',
    description: 'Returns text metrics that contain information about the measured text (such as its width, for example)',
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
            name: 'text',
            description: 'The text to measure',
            type: ArgType.String,
            required: true,
            rest: false
        },
        {
            name: 'font',
            description: 'The font',
            type: ArgType.String,
            required: true,
            rest: false
        },
        {
            name: 'property',
            description: 'The measured text\'s TextMetrics property to return',
            type: ArgType.Enum,
            enum: MeasureTextProperty,
            required: false,
            rest: false
        }
    ],
    async execute (ctx, [name, text, font, property]) {
        const canvas = ctx.canvasManager?.getOrCurrent(name)?.ctx;
        if (!canvas) return this.customError(ForgeCanvasError.NoCanvas);

        const valid = validateFont(font);
        if (!valid || typeof valid === 'string') return this.customError(valid);

        canvas.font = font;
        const res = canvas.measureText(text) as Record<string, any>;
        return this.success(property !== null
            ? res[MeasureTextProperty[
                (typeof property === 'string' ? MeasureTextProperty[property] : property) as any
            ]]
            : JSON.stringify(res)
        );
    }
});

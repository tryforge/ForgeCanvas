/*
* SPDX-License-Identifier: LGPL-3.0-or-later
* Copyright © 2026 BotForge
*/

import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { FCError } from '../../classes';

export default new NativeFunction({
    name: '$letterSpacing',
    description: 'Sets or returns the spacing between letters when drawing text.',
    version: '1.0.0',
    brackets: false,
    unwrap: true,
    args: [
        {
            name: 'canvas',
            description: 'Name of the canvas.',
            type: ArgType.String,
            required: false,
            rest: false
        },
        {
            name: 'spacing',
            description: 'The new spacing.',
            type: ArgType.Number,
            required: false,
            rest: false
        }
    ],
    async execute (ctx, [name, spacing]) {
        const canvas = (name
            ? ctx.canvasManager?.get(name)
            : ctx.canvasManager?.lastCurrent)?.ctx;
        if (!canvas) return this.customError(FCError.NoCanvas);

        return this.success(spacing !== undefined && spacing !== null
            ? (canvas.letterSpacing = `${spacing}px`, undefined)
            : canvas.letterSpacing
        );
    }
});

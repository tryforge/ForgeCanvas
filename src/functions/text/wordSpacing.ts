/*
* SPDX-License-Identifier: LGPL-3.0-or-later
* Copyright © 2026 BotForge
*/

import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { ForgeCanvasError } from '../..';

export default new NativeFunction({
    name: '$wordSpacing',
    description: 'Sets or returns the spacing between words when drawing text',
    version: '1.0.0',
    aliases: ["$wordSpace"],
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
            name: 'spacing',
            description: 'The new spacing',
            type: ArgType.Number,
            required: false,
            rest: false
        }
    ],
    execute (ctx, [name, spacing]) {
        const canvas = ctx.canvasManager?.getOrCurrent(name)?.ctx;
        if (!canvas) return this.customError(ForgeCanvasError.NoCanvas);

        return this.success(spacing !== undefined && spacing !== null
            ? (canvas.wordSpacing = `${spacing}px`, undefined)
            : canvas.wordSpacing
        );
    }
});

/*
* SPDX-License-Identifier: LGPL-3.0-or-later
* Copyright © 2026 BotForge
*/

import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { ForgeCanvasError, TextAlign } from '../..';

export default new NativeFunction({
    name: '$textAlign',
    aliases: ['$alignText'],
    description: 'Sets or returns the text align',
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
            name: 'align',
            description: 'The new align',
            type: ArgType.Enum,
            enum: TextAlign,
            required: false,
            rest: false
        }
    ],
    execute (ctx, [name, align]) {
        const canvas = ctx.canvasManager?.getOrCurrent(name)?.ctx;
        if (!canvas) return this.customError(ForgeCanvasError.NoCanvas);

        if (align !== null && align !== undefined) {
            canvas.textAlign = (
                typeof align === 'number' ? TextAlign[align] : align
            ) as CanvasTextAlign;
            return this.success();
        }

        return this.success(canvas.textAlign ?? 'start');
    }
});

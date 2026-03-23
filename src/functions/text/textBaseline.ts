/*
* SPDX-License-Identifier: LGPL-3.0-or-later
* Copyright © 2026 BotForge
*/

import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { ForgeCanvasError, TextBaseline } from '../..';

export default new NativeFunction({
    name: '$textBaseline',
    description: 'Sets or returns the text baseline',
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
            name: 'baseline',
            description: 'The new baseline',
            type: ArgType.Enum,
            enum: TextBaseline,
            required: false,
            rest: false
        }
    ],
    execute (ctx, [name, baseline]) {
        const canvas = ctx.canvasManager?.getOrCurrent(name)?.ctx;
        if (!canvas) return this.customError(ForgeCanvasError.NoCanvas);

        if (baseline !== null && baseline !== undefined) {
            canvas.textBaseline = (
                typeof baseline === 'number' ? TextBaseline[baseline] : baseline
            ) as CanvasTextBaseline;
            return this.success();
        }

        return this.success(canvas.textBaseline);
    }
});

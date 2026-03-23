/*
* SPDX-License-Identifier: LGPL-3.0-or-later
* Copyright © 2026 BotForge
*/

import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { ForgeCanvasError } from '../..';

export default new NativeFunction({
    name: '$lineDash',
    description: 'Sets or returns the line dash segments in a canvas',
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
            name: 'segments',
            description: 'The new line dash segments',
            type: ArgType.Json,
            required: false,
            rest: false
        }
    ],
    execute (ctx, [name, segments]) {
        const canvas = ctx.canvasManager?.getOrCurrent(name)?.ctx;
        if (!canvas) return this.customError(ForgeCanvasError.NoCanvas);

        if (segments && (!Array.isArray(segments) || !segments.every(x => typeof x === 'number')))
            return this.customError(ForgeCanvasError.InvalidLineDashSegments);

        return this.success(segments 
            ? (canvas.setLineDash(segments), undefined)
            : canvas.getLineDash()
        );
    }
});
/*
* SPDX-License-Identifier: LGPL-3.0-or-later
* Copyright © 2026 BotForge
*/

import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { ForgeCanvasError, WidthOrHeight } from '../..';

export default new NativeFunction({
    name: '$canvasSize',
    aliases: ['$canvasDimensions', '$canvasResolution'],
    description: 'Returns the canvas size',
    version: '1.1.0',
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
            name: 'property',
            description: 'The size property to return',
            type: ArgType.Enum,
            enum: WidthOrHeight,
            required: false,
            rest: false
        }
    ],
    execute (ctx, [name, property]) {
        const canvas = ctx.canvasManager?.getOrCurrent(name)?.inner;
        if (!canvas) return this.customError(ForgeCanvasError.NoCanvas);

        return this.success(property !== null // @ts-ignore
            ? canvas[WidthOrHeight[
                (typeof property === 'string' ? WidthOrHeight[property] : property) as any
            ]]
            : JSON.stringify({ width: canvas.width, height: canvas.height })
        );
    }
});

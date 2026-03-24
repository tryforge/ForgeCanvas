/*
* SPDX-License-Identifier: LGPL-3.0-or-later
* Copyright © 2026 BotForge
*/

import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { ForgeCanvasError, ImageFormat } from '../..';

export default new NativeFunction({
    name: '$canvasBuffer',
    description: 'Stores the current canvas buffer',
    version: '1.2.0',
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
            name: 'variable name',
            description: 'The variable to load it to, accessed with $env[name]',
            type: ArgType.String,
            required: true,
            rest: false,
            version: '1.3.0'
        },
        {
            name: 'format',
            description: 'The image format',
            type: ArgType.Enum,
            enum: ImageFormat,
            required: false,
            rest: false
        }
    ],
    async execute (ctx, [name, vname, f]) {
        const canvas = ctx.canvasManager?.getOrCurrent(name);
        if (!canvas) return this.customError(ForgeCanvasError.NoCanvas);

        ctx.setEnvironmentKey(vname, await canvas.encode(f));
        return this.success();
    }
});

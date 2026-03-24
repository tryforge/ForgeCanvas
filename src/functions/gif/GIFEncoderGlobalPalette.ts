/*
* SPDX-License-Identifier: LGPL-3.0-or-later
* Copyright © 2026 BotForge
*/

import { NativeFunction, ArgType } from '@tryforge/forgescript';

import { ForgeCanvasError } from '../..';

export default new NativeFunction({
    name: '$GIFEncoderGlobalPalette',
    aliases: ['$encoderGlobalPalette', '$globalPalette'],
    description: 'Gets the global palette of the GIF Encoder',
    version: '1.2.0',
    brackets: false,
    unwrap: true,
    args: [
        {
            name: 'gif',
            description: 'Name of the GIF',
            type: ArgType.String,
            required: false,
            rest: false
        }
    ],
    execute (ctx, [name]) {
        const gif = ctx.gifManager?.getEncoderOrCurrent(name);
        if (!gif) return this.customError(ForgeCanvasError.NoEncoder);
        
        return this.success(gif.palette !== null 
            ? `[${Array.from(gif.palette).join(', ')}]` : null
        );
    }
});
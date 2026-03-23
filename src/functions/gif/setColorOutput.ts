/*
* SPDX-License-Identifier: LGPL-3.0-or-later
* Copyright © 2026 BotForge
*/

import { ArgType, NativeFunction } from '@tryforge/forgescript';
import { DecodeOptions } from '@gifsx/gifsx';

import { GIFManager, ColorOutput, ForgeCanvasError } from '../..';

export default new NativeFunction({
    name: '$setColorOutput',
    aliases: ['$setOutputColor'],
    description: 'Configure the color output for the GIF Decoder',
    version: '1.2.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'name',
            description: 'Name of the Decode Options',
            type: ArgType.String,
            required: false,
            rest: false
        },
        {
            name: 'output',
            description: 'The color output type',
            type: ArgType.Enum,
            enum: ColorOutput,
            required: true,
            rest: false
        }
    ],
    execute (ctx, [name, output]) {
        const manager = ctx.gifManager instanceof GIFManager ?
            ctx.gifManager : ctx.gifManager = new GIFManager();
        if (!name && !manager.currentOptions)
            manager.currentOptions = new DecodeOptions();

        const options = name
            ? manager.getDecodeOptions(name)
            : manager.currentOptions;
        if (!options) return this.customError(ForgeCanvasError.NoDecodeOptions);

        options.setColorOutput(output as unknown as import('@gifsx/gifsx').ColorOutput);
        return this.success();
    }
});
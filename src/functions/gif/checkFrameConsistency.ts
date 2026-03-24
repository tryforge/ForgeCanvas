/*
* SPDX-License-Identifier: LGPL-3.0-or-later
* Copyright © 2026 BotForge
*/

import { ArgType, NativeFunction } from '@tryforge/forgescript';
import { DecodeOptions } from '@gifsx/gifsx';

import { GIFManager } from '../..';

export default new NativeFunction({
    name: '$checkFrameConsistency',
    aliases: ['$checkFrame', '$frameConsistency'],
    description: 'Configure if frames must be within the screen descriptor',
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
            name: 'boolean',
            description: 'If frames must be within the screen descriptor',
            type: ArgType.Boolean,
            required: true,
            rest: false
        }
    ],
    execute (ctx, [name, bool]) {
        const manager = ctx.gifManager instanceof GIFManager ?
            ctx.gifManager : ctx.gifManager = new GIFManager();
        if (!name && !manager.currentOptions)
            manager.currentOptions = new DecodeOptions();

        const options = name
            ? manager.getDecodeOptions(name)
            : manager.currentOptions;

        if (options) options.checkFrameConsistency(bool);
        return this.success();
    }
});
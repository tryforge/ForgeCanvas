/*
* SPDX-License-Identifier: LGPL-3.0-or-later
* Copyright © 2026 BotForge
*/

import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { FCError } from '../../classes';

export default new NativeFunction({
    name: '$cropCanvas',
    aliases: ['$canvasCrop', '$canvasTrim', '$trimCanvas'],
    description: 'Crops a canvas.',
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
            name: 'top',
            description: 'Whether to trim the top (true by default)',
            type: ArgType.Boolean,
            required: false,
            rest: false,
            version: '1.3.0'
        },
        {
            name: 'left',
            description: 'Whether to trim the left (true by default)',
            type: ArgType.Boolean,
            required: false,
            rest: false,
            version: '1.3.0'
        },
        {
            name: 'right',
            description: 'Whether to trim the right (true by default)',
            type: ArgType.Boolean,
            required: false,
            rest: false,
            version: '1.3.0'
        },
        {
            name: 'bottom',
            description: 'Whether to trim the bottom (true by default)',
            type: ArgType.Boolean,
            required: false,
            rest: false,
            version: '1.3.0'
        }
    ],
    execute (ctx, [name, top, left, right, bottom]) {
        const canvas = name
            ? ctx.canvasManager?.get(name)
            : ctx.canvasManager?.lastCurrent;
        if (!canvas) return this.customError(FCError.NoCanvas);

        return this.success(canvas.trim(
            top !== false,
            left !== false,
            right !== false,
            bottom !== false
        ));
    }
});

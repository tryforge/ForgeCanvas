/*
* SPDX-License-Identifier: LGPL-3.0-or-later
* Copyright © 2026 BotForge
*/

import { NativeFunction, ArgType } from '@tryforge/forgescript';

export default new NativeFunction({
    name: '$deleteEncoder',
    aliases: ['$removeEncoder'],
    description: 'Deletes the Encoder',
    version: '1.2.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'name',
            description: 'Name of the Encoder',
            type: ArgType.String,
            required: true,
            rest: false
        }
    ],
    execute (ctx, [name]) {
        ctx.gifManager?.removeEncoder(name);
        return this.success();
    }
});
/*
* SPDX-License-Identifier: LGPL-3.0-or-later
* Copyright © 2026 BotForge
*/

import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { hexToRgb } from '@gifsx/gifsx';

export default new NativeFunction({
    name: '$hexToRgb',
    description: 'Converts HEX into RGB',
    version: '1.2.1',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'hex',
            description: 'The hex to convert into RGB',
            type: ArgType.String,
            required: true,
            rest: true
        }
    ],
    execute (_, [hex]) {
        try {
            const res = hexToRgb(hex);
            return this.success(`[${res.join(', ')}]`);
        } catch(e) {
            return this.customError((e as any).toString());
        }
    }
});
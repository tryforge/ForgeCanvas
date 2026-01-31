/*
* SPDX-License-Identifier: LGPL-3.0-or-later
* Copyright © 2026 BotForge
*/

import { ArgType, NativeFunction } from '@tryforge/forgescript';
import { version as f } from '../../../package.json';
import { version as c } from '@napi-rs/canvas/package.json';

export default new NativeFunction({
    name: '$canvasVersion',
    description: 'Returns the forge.canvas version.',
    version: '1.1.0',
    brackets: false,
    unwrap: true,
    args: [
        {
            name: '@napi-rs/canvas',
            description: 'Returns the @napi-rs/canvas version used by forge.canvas instead if true.',
            type: ArgType.Boolean,
            rest: false,
            required: false,
            version: '1.3.0'
        }
    ],
    execute(_, [canvas]) { return this.success(canvas ? c : f) }
});

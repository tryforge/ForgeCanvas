/*
* SPDX-License-Identifier: LGPL-3.0-or-later
* Copyright © 2026 BotForge
*/

import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { BarData } from '../..';

export default new NativeFunction({
    name: '$barData',
    description: 'Adds data to the progress bar.',
    version: '1.2.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'value',
            description: 'Value for the data segment (percentage or absolute).',
            type: ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'style',
            description: 'Style for the data segment.',
            type: ArgType.String,
            required: true,
            rest: false
        }
    ],
    execute(ctx, [value, style]) {
        const barData = (ctx.getEnvironmentKey('progressBarData') || []) as BarData[];
        barData.push({ value: value, style });

        ctx.setEnvironmentKey('progressBarData', barData);
        return this.success();
    }
});

/*
* SPDX-License-Identifier: LGPL-3.0-or-later
* Copyright © 2026 BotForge
*/

import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { LottieAnimation } from '@napi-rs/canvas';

import { readFileSync, existsSync } from 'node:fs';

import { LottieManager } from '../..';

export default new NativeFunction({
    name: '$loadLottieAnimation',
    aliases: ['$loadLottie', '$lottie', '$lottieAnimation'],
    description: 'Loads a lottie animation from an URL/File path or a JSON',
    version: '1.3.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'lottie',
            description: 'Name of the lottie animation to load',
            type: ArgType.String,
            required: true,
            rest: false
        },
        {
            name: 'data',
            description: 'Data of the lottie animation to load',
            type: ArgType.String,
            required: true,
            rest: false
        },
        {
            name: 'resourcePath',
            description: 'Base path for resolving external resources (images, fonts)',
            type: ArgType.String,
            required: false,
            rest: false
        }
    ],
    execute(ctx, [name, data, resourcePath]) {
        if (!(ctx.lottieManager instanceof LottieManager))
            ctx.lottieManager = new LottieManager();

        const d = existsSync(data) ? readFileSync(data) : data;
        ctx.lottieManager.set(
            name, LottieAnimation.loadFromData(
                d, resourcePath ? { resourcePath } : undefined
            )
        );

        return this.success();
    }
});

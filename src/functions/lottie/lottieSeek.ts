/*
* SPDX-License-Identifier: LGPL-3.0-or-later
* Copyright © 2026 BotForge
*/

import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { ForgeCanvasError, LottieSeekType } from '../..';

export default new NativeFunction({
    name: '$lottieSeek',
    aliases: ['$lottieTo'],
    description: 'Seeks to a specific position/frame/time in a lottie animation',
    version: '1.3.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'lottie',
            description: 'Name of the lottie animation',
            type: ArgType.String,
            required: true,
            rest: false
        },
        {
            name: 'type',
            description: 'Type of position used to seek',
            type: ArgType.Enum,
            enum: LottieSeekType,
            required: true,
            rest: false
        },
        {
            name: 'position',
            description: 'The position/frame/time to seek to',
            type: ArgType.Number,
            required: true,
            rest: false
        }
    ],
    execute(ctx, [name, type, t]) {
        const lottie = ctx.lottieManager?.get(name);
        if (!lottie) return this.customError(ForgeCanvasError.NoLottie);

        lottie[
            type === LottieSeekType.frame ? 'seekFrame'
                : type === LottieSeekType.time ? 'seekTime'
            : 'seek'
        ](t);
        return this.success();
    }
});

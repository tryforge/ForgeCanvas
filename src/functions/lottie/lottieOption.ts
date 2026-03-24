/*
* SPDX-License-Identifier: LGPL-3.0-or-later
* Copyright © 2026 BotForge
*/

import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { ForgeCanvasError, LottieOption } from '../..';

export default new NativeFunction({
    name: '$lottieOption',
    aliases: ['$lottieProperty', '$lottieOpt', '$lottieAnimationOption', '$lottieAnimationProperty'],
    description: 'Returns an option of the lottie animation',
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
            name: 'option',
            description: 'The option to get',
            type: ArgType.Enum,
            enum: LottieOption,
            required: true,
            rest: false
        },
    ],
    execute(ctx, [name, option]) {
        const lottie = ctx.lottieManager?.get(name);
        if (!lottie) return this.customError(ForgeCanvasError.NoLottie);

        // @ts-expect-error
        return this.success(lottie[
            typeof option === 'number' ? LottieOption[option] : option
        ]);
    }
});

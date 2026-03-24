"use strict";
/*
* SPDX-License-Identifier: LGPL-3.0-or-later
* Copyright © 2026 BotForge
*/
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("../..");
exports.default = new forgescript_1.NativeFunction({
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
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false
        },
        {
            name: 'option',
            description: 'The option to get',
            type: forgescript_1.ArgType.Enum,
            enum: __1.LottieOption,
            required: true,
            rest: false
        },
    ],
    execute(ctx, [name, option]) {
        const lottie = ctx.lottieManager?.get(name);
        if (!lottie)
            return this.customError(__1.ForgeCanvasError.NoLottie);
        // @ts-expect-error
        return this.success(lottie[typeof option === 'number' ? __1.LottieOption[option] : option]);
    }
});

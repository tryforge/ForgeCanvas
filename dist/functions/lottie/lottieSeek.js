"use strict";
/*
* SPDX-License-Identifier: LGPL-3.0-or-later
* Copyright © 2026 BotForge
*/
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("../..");
exports.default = new forgescript_1.NativeFunction({
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
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false
        },
        {
            name: 'type',
            description: 'Type of seek',
            type: forgescript_1.ArgType.Enum,
            enum: __1.LottieSeekType,
            required: true,
            rest: false
        },
        {
            name: 't',
            description: 'The position/frame/time to seek to',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        }
    ],
    execute(ctx, [name, type, t]) {
        const lottie = ctx.lottieManager?.get(name);
        if (!lottie)
            return this.customError(__1.ForgeCanvasError.NoLottie);
        lottie[type === __1.LottieSeekType.frame ? 'seekFrame'
            : type === __1.LottieSeekType.time ? 'seekTime'
                : 'seek'](t);
        return this.success();
    }
});

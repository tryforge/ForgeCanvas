"use strict";
/*
* SPDX-License-Identifier: LGPL-3.0-or-later
* Copyright © 2026 BotForge
*/
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const canvas_1 = require("@napi-rs/canvas");
const node_fs_1 = require("node:fs");
const __1 = require("../..");
exports.default = new forgescript_1.NativeFunction({
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
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false
        },
        {
            name: 'data',
            description: 'Data of the lottie animation to load',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false
        },
        {
            name: 'resourcePath',
            description: 'Base path for resolving external resources (images, fonts)',
            type: forgescript_1.ArgType.String,
            required: false,
            rest: false
        }
    ],
    execute(ctx, [name, data, resourcePath]) {
        if (!(ctx.lottieManager instanceof __1.LottieManager))
            ctx.lottieManager = new __1.LottieManager();
        const d = (0, node_fs_1.existsSync)(data) ? (0, node_fs_1.readFileSync)(data) : data;
        ctx.lottieManager.set(name, canvas_1.LottieAnimation.loadFromData(d, resourcePath ? { resourcePath } : undefined));
        return this.success();
    }
});

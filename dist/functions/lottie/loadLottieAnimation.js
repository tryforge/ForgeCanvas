"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const fs_1 = require("fs");
const classes_1 = require("../../classes");
const canvas_1 = require("@napi-rs/canvas");
exports.default = new forgescript_1.NativeFunction({
    name: '$loadLottieAnimation',
    aliases: ['$loadLottie', '$lottie', '$lottieAnimation'],
    description: 'Loads a lottie animation.',
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
        if (!(ctx.lottieManager instanceof classes_1.LottieManager))
            ctx.lottieManager = new classes_1.LottieManager();
        const d = (0, fs_1.existsSync)(data) ? (0, fs_1.readFileSync)(data) : data;
        ctx.lottieManager.set(name, canvas_1.LottieAnimation.loadFromData(d, resourcePath ? { resourcePath } : undefined));
        return this.success();
    }
});

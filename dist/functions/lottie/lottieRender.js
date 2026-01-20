"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("../..");
exports.default = new forgescript_1.NativeFunction({
    name: '$lottieRender',
    aliases: ['$drawLottie', '$lottieAnimationRender', '$drawLottieAnimation'],
    description: 'Renders the current frame of a lottie animation on a canvas',
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
            name: 'canvas',
            description: 'The canvas to render the current lottie frame on',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false
        },
        {
            name: 'x',
            description: 'The X coordinate to render the lottie animation at',
            type: forgescript_1.ArgType.Number,
            required: false,
            rest: false
        },
        {
            name: 'y',
            description: 'The Y coordinate to render the lottie animation at',
            type: forgescript_1.ArgType.Number,
            required: false,
            rest: false
        },
        {
            name: 'width',
            description: 'The width of the lottie animation',
            type: forgescript_1.ArgType.Number,
            required: false,
            rest: false
        },
        {
            name: 'height',
            description: 'The height of the lottie animation',
            type: forgescript_1.ArgType.Number,
            required: false,
            rest: false
        }
    ],
    execute(ctx, [name, canvas, x, y, width, height]) {
        const lottie = ctx.lottieManager?.get(name);
        if (!lottie)
            return this.customError(__1.FCError.NoLottie);
        const context = ctx.canvasManager?.get(canvas)?.ctx;
        if (!context)
            return this.customError(__1.FCError.NoCanvas);
        lottie.render(context, // @ts-expect-error
        x !== null && typeof x !== 'string'
            ? { x, y, width, height } : undefined);
        return this.success();
    }
});

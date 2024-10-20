"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("../..");
const gif_encoder_2_1 = __importDefault(require("gif-encoder-2"));
exports.default = new forgescript_1.NativeFunction({
    name: '$setGIFConfig',
    aliases: ['$gifConfig', '$setGIFParams', '$gifParams'],
    description: 'Sets the params of the new gif.',
    version: '1.1.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'width',
            description: 'Width of the new gif.',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'height',
            description: 'Height of the new gif.',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'algorithm',
            description: 'The color quantization algorithm to use.',
            type: forgescript_1.ArgType.Enum,
            enum: __1.ColorQuantizationAlgorithm,
            required: false,
            rest: false
        }
    ],
    async execute(ctx, [width, height, algorithm]) {
        if (!ctx.gifManager || !(ctx.gifManager instanceof __1.GIFManager))
            ctx.gifManager = new __1.GIFManager();
        const gif = new gif_encoder_2_1.default(width, height, algorithm !== null
            ? __1.ColorQuantizationAlgorithm[(typeof algorithm === 'string'
                ? __1.ColorQuantizationAlgorithm[algorithm]
                : algorithm)]
            : undefined);
        gif.start();
        ctx.gifManager.current.push(gif);
        return this.success();
    }
});
//# sourceMappingURL=setGIFConfig.js.map
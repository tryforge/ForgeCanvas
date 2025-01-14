"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("../..");
exports.default = new forgescript_1.NativeFunction({
    name: '$GIFEncoderSize',
    aliases: ['$encoderSize'],
    description: 'Returns the size of the GIF Encoder.',
    version: '1.2.0',
    brackets: false,
    unwrap: true,
    args: [
        {
            name: 'gif',
            description: 'Name of the Encoder.',
            type: forgescript_1.ArgType.String,
            required: false,
            rest: false
        },
        {
            name: 'property',
            description: 'The size property to return.',
            type: forgescript_1.ArgType.Enum,
            enum: __1.WidthOrHeight,
            required: false,
            rest: false
        }
    ],
    async execute(ctx, [name, property]) {
        const gif = name
            ? ctx.gifManager?.getEncoder(name)
            : !name && ctx.gifManager?.currentEncoder?.length !== 0
                ? ctx.gifManager?.currentEncoder?.[ctx.gifManager?.currentEncoder?.length - 1] : null;
        if (!gif)
            return this.customError('No gif');
        return this.success(property !== null // @ts-ignore
            ? gif[__1.WidthOrHeight[(typeof property === 'string' ? __1.WidthOrHeight[property] : property)]]
            : JSON.stringify({ width: gif.width, height: gif.height }));
    }
});
//# sourceMappingURL=GIFEncoderSize.js.map
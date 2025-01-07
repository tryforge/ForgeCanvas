"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: '$GIFDecoderBGColor',
    aliases: ['$decoderBGColor', '$GIFDecoderBackgroundColor', '$decoderBackgroundColor', '$GIFDecoderBackground', '$decoderBackground'],
    description: 'Returns the background color of the GIF Decoder.',
    version: '1.2.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'gif',
            description: 'Name of the Decoder.',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false
        }
    ],
    async execute(ctx, [name]) {
        const gif = ctx.gifManager?.getDecoder(name);
        if (!gif)
            return this.customError('No gif');
        return this.success(gif.bgColor);
    }
});
//# sourceMappingURL=GIFDecoderBGColor.js.map
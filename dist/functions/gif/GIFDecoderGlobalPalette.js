"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: '$GIFDecoderGlobalPalette',
    aliases: ['$decoderGlobalPalette'],
    description: 'Returns the global palette of the GIF Decoder.',
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
        return this.success(gif.globalPalette);
    }
});
//# sourceMappingURL=GIFDecoderGlobalPalette.js.map
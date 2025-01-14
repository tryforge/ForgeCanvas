"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: '$GIFEncoderGlobalPalette',
    aliases: ['$encoderGlobalPalette', '$globalPalette'],
    description: 'Gets the global palette of the GIF Encoder.',
    version: '1.2.0',
    brackets: false,
    unwrap: true,
    args: [
        {
            name: 'gif',
            description: 'Name of the GIF.',
            type: forgescript_1.ArgType.String,
            required: false,
            rest: false
        }
    ],
    async execute(ctx, [name]) {
        const gif = name
            ? ctx.gifManager?.getEncoder(name)
            : !name && ctx.gifManager?.currentEncoder?.length !== 0
                ? ctx.gifManager?.currentEncoder?.[ctx.gifManager?.currentEncoder?.length - 1] : null;
        if (!gif)
            return this.customError('No gif');
        return this.success(gif.palette !== null
            ? `[${Array.from(gif.palette).join(', ')}]` : null);
    }
});
//# sourceMappingURL=GIFEncoderGlobalPalette.js.map
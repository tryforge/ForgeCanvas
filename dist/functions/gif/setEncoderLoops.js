"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: '$setEncoderLoops',
    aliases: ['$setEncoderRepeat', '$setGIFEncoderRepeat', '$setGIFEncoderLoops', '$setLoops', '$setRepeat'],
    description: 'Sets the number of loops for the GIF Encoder.',
    version: '1.2.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'gif',
            description: 'Name of the GIF.',
            type: forgescript_1.ArgType.String,
            required: false,
            rest: false
        },
        {
            name: 'loops',
            description: 'Number of loops.',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        }
    ],
    async execute(ctx, [name, loops]) {
        const gif = name
            ? ctx.gifManager?.getEncoder(name)
            : !name && ctx.gifManager?.currentEncoder?.length !== 0
                ? ctx.gifManager?.currentEncoder?.[ctx.gifManager?.currentEncoder?.length - 1] : null;
        if (!gif)
            return this.customError('No gif');
        gif.setRepeat(loops);
        return this.success();
    }
});
//# sourceMappingURL=setEncoderLoops.js.map
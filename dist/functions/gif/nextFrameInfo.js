"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: '$nextFrameInfo',
    description: 'Reads and saves the next frame info (skipping the buffer) of the GIF Decoder into an env.',
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
        },
        {
            name: 'env',
            description: 'Name of the env to save the frame info.',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false
        }
    ],
    async execute(ctx, [name, env]) {
        const gif = ctx.gifManager?.getDecoder(name);
        if (!gif)
            return this.customError('No gif');
        ctx.setEnvironmentKey(env, gif.nextFrameInfo());
        return this.success();
    }
});
//# sourceMappingURL=nextFrameInfo.js.map
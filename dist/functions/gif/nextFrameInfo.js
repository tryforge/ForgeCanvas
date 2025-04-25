"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const classes_1 = require("../../classes");
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
            name: 'name',
            description: 'The frame name to save the info as.',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false
        }
    ],
    execute(ctx, [name, f]) {
        const gif = ctx.gifManager?.getDecoder(name);
        if (!gif)
            return this.customError(classes_1.FCError.NoDecoder);
        const frame = gif.nextFrameInfo();
        if (frame) {
            ctx.gifManager?.setFrame(f, frame);
            return this.success(f);
        }
        ctx.gifManager?.removeFrame(f);
        return this.success();
    }
});

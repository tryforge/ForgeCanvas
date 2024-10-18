"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: '$setFPS',
    description: 'Sets the FPS (Frames Per Second) of a GIF.',
    version: '1.2.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'gif',
            description: 'Name of the GIF.',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false
        },
        {
            name: 'frames',
            description: 'Number of frames per second to display.',
            type: forgescript_1.ArgType.Number,
            required: false,
            rest: false
        }
    ],
    async execute(ctx, [gifName, fps]) {
        // Ensure the GIFManager is properly initialized and the specified GIF exists
        const gif = ctx.gifManager?.get(gifName);
        if (!gif) {
            return this.customError('No GIF with the provided name found.');
        }
        // Set the FPS of the GIF
        gif.setFramesPerSecond(fps);
        return this.success();
    }
});
//# sourceMappingURL=setFPS.js.map
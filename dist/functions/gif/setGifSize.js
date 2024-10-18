"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const GIFEncoder = require("gif-encoder-2");
const __1 = require("../../");
exports.default = new forgescript_1.NativeFunction({
    name: '$setGIFSize',
    description: 'Sets the size of the new GIF.',
    version: '1.2.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'width',
            description: 'Width of the new GIF.',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'height',
            description: 'Height of the new GIF.',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        }
    ],
    async execute(ctx, [width, height]) {
        // Ensure GIFManager is properly initialized
        if (!ctx.gifManager || !(ctx.gifManager instanceof __1.GIFManager)) {
            ctx.gifManager = new __1.GIFManager();
        }
        // Create a new GIFEncoder with the specified dimensions
        const gif = new GIFEncoder(width, height);
        gif.start(); // Start the GIF encoding process
        // Ensure ctx.gifManager.current is an array before pushing the new GIFEncoder instance
        if (!Array.isArray(ctx.gifManager.current)) {
            ctx.gifManager.current = [];
        }
        ctx.gifManager.current.push(gif);
        return this.success();
    }
});
//# sourceMappingURL=setGifSize.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: '$setThreshold',
    description: 'Sets if the color table should be reused if the current frame matches the previous frame.',
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
            name: 'percentage',
            description: 'Threshold percentage.',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        }
    ],
    async execute(ctx, [gifName, percentage]) {
        // Ensure the GIFManager is properly initialized and the specified GIF exists
        const gif = ctx.gifManager?.get(gifName);
        if (!gif) {
            return this.customError('No GIF with the provided name found.');
        }
        // Validate the percentage value
        if (percentage < 0 || percentage > 100) {
            return this.customError('Threshold percentage must be between 0 and 100.');
        }
        // Set the threshold for the GIF
        await gif.setThreshold(percentage);
        return this.success();
    }
});
//# sourceMappingURL=setThreshole.js.map
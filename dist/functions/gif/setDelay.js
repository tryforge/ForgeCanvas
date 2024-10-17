"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: '$setQuality',
    description: 'Sets the GIF color quality.',
    version: '1.2.0',
    brackets: false,
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
            name: 'quality',
            description: 'The quality. (0-30)',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        }
    ],
    async execute(ctx, [name, quality]) {
        const gif = ctx.gifManager?.get(name);
        if (!gif) {
            return this.customError('No GIF with provided name found.');
        }
        if (quality < 0 || quality > 30) {
            return this.customError('Quality must be between 0 and 30.');
        }
        await gif.setQuality(quality);
        return this.success();
    }
});
//# sourceMappingURL=setDelay.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: '$setQuality',
    description: 'Sets the GIF color quality.',
    version: '1.1.0',
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
            name: 'quality',
            description: 'The quality. (0-30)',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        }
    ],
    async execute(ctx, [name, quality]) {
        const gif = name
            ? ctx.gifManager?.get(name)
            : !name && ctx.gifManager?.current?.length !== 0
                ? ctx.gifManager?.current?.[ctx.gifManager?.current?.length - 1] : null;
        if (!gif)
            return this.customError('No GIF with provided name found.');
        if (quality < 0 || quality > 30)
            return this.customError('Quality must be between 0 and 30.');
        await gif.setQuality(quality);
        return this.success();
    }
});
//# sourceMappingURL=setQuality.js.map
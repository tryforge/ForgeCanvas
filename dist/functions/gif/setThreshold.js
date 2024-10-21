"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: '$setThreshold',
    description: 'Sets if the color table should be reused if the current frame matches the previous frame.',
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
            name: 'percentage',
            description: 'Threshold percentage.',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        }
    ],
    async execute(ctx, [gifName, percentage]) {
        const gif = gifName
            ? ctx.gifManager?.get(gifName)
            : !gifName && ctx.gifManager?.current?.length !== 0
                ? ctx.gifManager?.current?.[ctx.gifManager?.current?.length - 1] : null;
        if (!gif)
            return this.customError('No GIF with the provided name found.');
        if (percentage < 0 || percentage > 100)
            return this.customError('Threshold percentage must be between 0 and 100.');
        await gif.setThreshold(percentage);
        return this.success();
    }
});
//# sourceMappingURL=setThreshold.js.map
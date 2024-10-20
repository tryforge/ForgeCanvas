"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: '$setPaletteSize',
    description: 'Sets the palette size of a gif.',
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
            name: 'size',
            description: 'The new size.',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        }
    ],
    async execute(ctx, [gifName, size]) {
        const gif = gifName
            ? ctx.gifManager?.get(gifName)
            : !gifName && ctx.gifManager?.current?.length !== 0
                ? ctx.gifManager?.current?.[ctx.gifManager?.current?.length - 1] : null;
        if (!gif)
            return this.customError('No GIF.');
        if (size < 0 || size > 255)
            return this.customError('Invalid palette size.');
        gif.setPaletteSize(size);
        return this.success();
    }
});
//# sourceMappingURL=setPaletteSize.js.map
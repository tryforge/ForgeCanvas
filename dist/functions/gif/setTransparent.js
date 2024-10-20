"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: '$setTransparent',
    description: 'Sets the transparent color of a gif.',
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
            name: 'color',
            description: 'The new transparency color.',
            type: forgescript_1.ArgType.Color,
            required: true,
            rest: false
        }
    ],
    async execute(ctx, [gifName, color]) {
        const gif = gifName
            ? ctx.gifManager?.get(gifName)
            : !gifName && ctx.gifManager?.current?.length !== 0
                ? ctx.gifManager?.current?.[ctx.gifManager?.current?.length - 1] : null;
        if (!gif)
            return this.customError('No GIF.');
        gif.setTransparent(color);
        return this.success();
    }
});
//# sourceMappingURL=setTransparent.js.map
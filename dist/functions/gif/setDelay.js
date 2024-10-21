"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: '$setDelay',
    description: 'Sets the GIF display frame delay.',
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
            name: 'delay',
            description: 'Number of milliseconds to display the frame.',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        }
    ],
    async execute(ctx, [gifName, delay]) {
        const gif = gifName
            ? ctx.gifManager?.get(gifName)
            : !gifName && ctx.gifManager?.current?.length !== 0
                ? ctx.gifManager?.current?.[ctx.gifManager?.current?.length - 1] : null;
        if (!gif)
            return this.customError('No GIF.');
        await gif.setDelay(delay);
        return this.success();
    }
});
//# sourceMappingURL=setDelay.js.map
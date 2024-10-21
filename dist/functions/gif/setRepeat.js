"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: '$setRepeat',
    aliases: ['$setLoops'],
    description: 'Sets the number of loops a GIF does.',
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
            name: 'loops',
            description: 'The number of loops.',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        }
    ],
    async execute(ctx, [gifName, loops]) {
        const gif = gifName
            ? ctx.gifManager?.get(gifName)
            : !gifName && ctx.gifManager?.current?.length !== 0
                ? ctx.gifManager?.current?.[ctx.gifManager?.current?.length - 1] : null;
        if (!gif)
            return this.customError('No GIF with the provided name found.');
        await gif.setRepeat(loops);
        return this.success();
    }
});
//# sourceMappingURL=setRepeat.js.map
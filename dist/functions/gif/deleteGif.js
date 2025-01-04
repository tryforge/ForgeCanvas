"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: '$deleteGIF',
    aliases: ['$removeGIF'],
    description: 'Deletes the GIF.',
    version: '1.1.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'name',
            description: 'Name of the gif.',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false
        }
    ],
    async execute(ctx, [name]) {
        ctx.gifManager?.remove(name);
        return this.success();
    }
});
//# sourceMappingURL=deleteGif.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: '$deleteImage',
    aliases: ['$removeImage'],
    description: 'Deletes the image.',
    version: '1.2.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'name',
            description: 'Name of the image.',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false
        }
    ],
    async execute(ctx, [name]) {
        ctx.imageManager?.remove(name);
        return this.success();
    }
});
//# sourceMappingURL=deleteImage.js.map
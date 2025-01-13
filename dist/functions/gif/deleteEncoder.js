"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: '$deleteEncoder',
    aliases: ['$removeEncoder'],
    description: 'Deletes the Encoder.',
    version: '1.2.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'name',
            description: 'Name of the Encoder.',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false
        }
    ],
    async execute(ctx, [name]) {
        ctx.gifManager?.removeEncoder(name);
        return this.success();
    }
});
//# sourceMappingURL=deleteEncoder.js.map
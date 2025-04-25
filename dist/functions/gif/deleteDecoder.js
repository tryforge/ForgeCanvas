"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: '$deleteDecoder',
    aliases: ['$removeDecoder'],
    description: 'Deletes the Decoder.',
    version: '1.2.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'name',
            description: 'Name of the Decoder.',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false
        }
    ],
    execute(ctx, [name]) {
        ctx.gifManager?.removeDecoder(name);
        return this.success();
    }
});

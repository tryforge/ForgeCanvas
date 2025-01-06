"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: '$newGIFEncoder',
    aliases: ['$createGIFEncoder', '$GIFEncoder'],
    description: 'Creates a new GIF encoder.',
    version: '1.2.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'gif',
            description: 'Name of the new gif.',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false
        },
        {
            name: 'functions',
            description: 'Functions.',
            type: forgescript_1.ArgType.Unknown,
            required: false,
            rest: true
        }
    ],
    async execute(ctx, [name]) {
        if (!ctx.gifManager || ctx.gifManager.currentEncoder.length === 0)
            return this.customError('No size and  has been set');
        const i = ctx.gifManager.currentEncoder.length - 1;
        ctx.gifManager.setEncoder(name, ctx.gifManager.currentEncoder[i]);
        ctx.gifManager.currentEncoder = ctx.gifManager.currentEncoder.slice(0, i);
        return this.success();
    }
});
//# sourceMappingURL=newGIFEncoder.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("../..");
exports.default = new forgescript_1.NativeFunction({
    name: '$createGIF',
    aliases: ['$newGIF', '$gif'],
    description: 'Creates a gif.',
    version: '1.1.0',
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
        if (!ctx.gifManager || !(ctx.gifManager instanceof __1.GIFManager))
            ctx.gifManager = new __1.GIFManager();
        const i = ctx.gifManager.current.length - 1;
        ctx.gifManager.set(name, ctx.gifManager.current[i]);
        ctx.gifManager.current = ctx.gifManager.current.slice(0, i);
        return this.success();
    }
});
//# sourceMappingURL=createGIF.js.map
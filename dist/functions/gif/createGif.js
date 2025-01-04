"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: '$createGIF',
    aliases: ['$newGIF'],
    description: 'Creates a new GIF.',
    version: '1.1.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'name',
            description: 'Name of the GIF to create.',
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
        if (!ctx.gifManager || ctx.gifManager?.current.length === 0)
            return this.customError('No size has been set');
        const i = ctx.gifManager?.current.length - 1;
        ctx.gifManager?.set(name, ctx.gifManager?.current[i]);
        ctx.gifManager.current = ctx.gifManager?.current.slice(0, i);
        return this.success();
    }
});
//# sourceMappingURL=createGif.js.map
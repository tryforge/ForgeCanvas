"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: '$createCanvas',
    description: 'Creates a new canvas.',
    version: '1.0.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'canvas',
            description: 'Name of the new canvas.',
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
        if (!ctx.canvasManager || ctx.canvasManager.current.length === 0)
            return this.customError('No size has been set');
        const i = ctx.canvasManager.current.length - 1;
        ctx.canvasManager.set(name, ctx.canvasManager.current[i]);
        ctx.canvasManager.current = ctx.canvasManager.current.slice(0, i);
        return this.success();
    }
});
//# sourceMappingURL=createCanvas.js.map
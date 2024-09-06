"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("../..");
exports.default = new forgescript_1.NativeFunction({
    name: '$setCanvasSize',
    description: 'Sets size of the new canvas.',
    version: '1.0.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'width',
            description: 'Width of the new canvas.',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'height',
            description: 'Height of the new canvas.',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        }
    ],
    async execute(ctx, [w, h]) {
        if (!ctx.canvasManager || !(ctx.canvasManager instanceof __1.CanvasManager))
            ctx.canvasManager = new __1.CanvasManager();
        ctx.canvasManager.current.push(new __1.CanvasBuilder(w, h));
        return this.success();
    }
});
//# sourceMappingURL=setCanvasSize.js.map
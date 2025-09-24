"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("../..");
exports.default = new forgescript_1.NativeFunction({
    name: '$stroke',
    aliases: ['$strokePath', '$pathStroke'],
    description: 'Strokes (outlines) the current path.',
    version: '1.1.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'canvas',
            description: 'Name of the canvas.',
            type: forgescript_1.ArgType.String,
            required: false,
            rest: false
        },
        {
            name: 'style',
            description: 'The style. (color/gradient/pattern)',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false
        }
    ],
    async execute(ctx, [name, style]) {
        const canvas = name
            ? ctx.canvasManager?.get(name)
            : ctx.canvasManager?.lastCurrent;
        if (!canvas)
            return this.customError(__1.FCError.NoCanvas);
        const oldstyle = canvas.ctx.strokeStyle, s = await __1.CanvasUtil.resolveStyle(this, ctx, canvas, style);
        if (s instanceof forgescript_1.Return)
            return s;
        canvas.ctx.strokeStyle = s;
        canvas.ctx.stroke();
        canvas.ctx.strokeStyle = oldstyle;
        return this.success();
    }
});

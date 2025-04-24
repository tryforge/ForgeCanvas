"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("../..");
exports.default = new forgescript_1.NativeFunction({
    name: '$fill',
    aliases: ['$pathFill', '$fillPath'],
    description: 'Fills the current path.',
    version: '1.0.0',
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
        },
        {
            name: 'fillRule',
            description: 'The fill rule',
            type: forgescript_1.ArgType.Enum,
            enum: __1.FillRule,
            required: false,
            rest: false
        }
    ],
    async execute(ctx, [name, style, rule]) {
        const canvas = name
            ? ctx.canvasManager?.get(name)
            : ctx.canvasManager?.lastCurrent;
        if (!canvas)
            return this.customError('No canvas');
        const oldstyle = canvas.ctx.fillStyle;
        canvas.ctx.fillStyle = await __1.CanvasUtil.parseStyle(this, ctx, canvas, style);
        canvas.ctx.fill((typeof rule === 'number' ? __1.FillRule[rule] : rule));
        canvas.ctx.fillStyle = oldstyle;
        return this.success();
    }
});

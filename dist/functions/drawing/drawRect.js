"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("../..");
exports.default = new forgescript_1.NativeFunction({
    name: '$drawRect',
    aliases: ['$placeRect', '$rectangle', '$rect'],
    description: 'Draws a rectangle on a canvas.',
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
            name: 'type',
            description: 'The rectangle type.',
            type: forgescript_1.ArgType.Enum,
            enum: __1.FillOrStrokeOrClear,
            required: true,
            rest: false
        },
        {
            name: 'style',
            description: 'The style. (color/gradient/pattern)',
            type: forgescript_1.ArgType.String,
            required: false,
            rest: false
        },
        {
            name: 'x',
            description: 'The rect start X coordinate.',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'y',
            description: 'The rect start Y coordinate.',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'width',
            description: 'The rect width.',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'height',
            description: 'The rect height.',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'radius',
            description: 'The rect radius.',
            type: forgescript_1.ArgType.Number,
            required: false,
            rest: true
        }
    ],
    async execute(ctx, [name, t, style, x, y, width, height, radius]) {
        const canvas = name
            ? ctx.canvasManager?.get(name)
            : ctx.canvasManager?.lastCurrent;
        if (!canvas)
            return this.customError(__1.FCError.NoCanvas);
        if (!style && (t === __1.FillOrStrokeOrClear.fill || t === __1.FillOrStrokeOrClear.stroke))
            return this.customError(__1.FCError.NoStyle);
        const styleT = t === __1.FillOrStrokeOrClear.fill ? 'fillStyle' : 'strokeStyle', s = await __1.CanvasUtil.resolveStyle(this, ctx, canvas, style);
        if (s instanceof forgescript_1.Return)
            return s;
        canvas.ctx[styleT] = s;
        canvas.rect(t, x, y, width, height, radius.length === 1
            ? radius[0] : radius);
        return this.success();
    }
});

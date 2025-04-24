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
    async execute(ctx, [name, t, style, x, y, w, h, r]) {
        const canvas = name
            ? ctx.canvasManager?.get(name)
            : ctx.canvasManager?.lastCurrent;
        if (!canvas)
            return this.customError('No canvas');
        if (!style && (t === __1.FillOrStrokeOrClear.fill || t === __1.FillOrStrokeOrClear.stroke))
            return this.customError('No style provided.');
        const styleT = t === __1.FillOrStrokeOrClear.fill ? 'fillStyle' : 'strokeStyle', oldstyle = canvas.ctx[styleT];
        canvas.ctx[styleT] = await __1.CanvasUtil.parseStyle(this, ctx, canvas, style) ?? '#000000';
        canvas.rect(t, x, y, w, h, r.length === 1 ? r[0] : r);
        canvas.ctx[styleT] = oldstyle;
        return this.success();
    }
});

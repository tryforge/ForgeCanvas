import { NativeFunction, ArgType, Return } from '@tryforge/forgescript';
import { CanvasUtil, FCError, FillOrStrokeOrClear } from '../..';

export default new NativeFunction({
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
            type: ArgType.String,
            required: false,
            rest: false
        },
        {
            name: 'type',
            description: 'The rectangle type.',
            type: ArgType.Enum,
            enum: FillOrStrokeOrClear,
            required: true,
            rest: false
        },
        {
            name: 'style',
            description: 'The style. (color/gradient/pattern)',
            type: ArgType.String,
            required: false,
            rest: false
        },
        {
            name: 'x',
            description: 'The rect start X coordinate.',
            type: ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'y',
            description: 'The rect start Y coordinate.',
            type: ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'width',
            description: 'The rect width.',
            type: ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'height',
            description: 'The rect height.',
            type: ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'radius',
            description: 'The rect radius.',
            type: ArgType.Number,
            required: false,
            rest: true
        }
    ],
    async execute (ctx, [name, t, style, x, y, width, height, radius]) {
        const canvas = name
            ? ctx.canvasManager?.get(name)
            : ctx.canvasManager?.lastCurrent;
        if (!canvas) return this.customError(FCError.NoCanvas);

        if (!style && (t === FillOrStrokeOrClear.fill || t === FillOrStrokeOrClear.stroke))
            return this.customError(FCError.NoStyle);

        const styleT = t === FillOrStrokeOrClear.fill ? 'fillStyle' : 'strokeStyle',
              oldstyle = canvas.ctx[styleT],
              s = await CanvasUtil.resolveStyle(this, ctx, canvas, style);
        if (s instanceof Return) return s;

        canvas.ctx[styleT] = s;
        canvas.rect(
            t, x, y,
            width, height,
            radius.length === 1
                ? radius[0] : radius
        );
        canvas.ctx[styleT] = oldstyle;

        return this.success();
    }
});
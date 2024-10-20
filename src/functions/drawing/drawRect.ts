import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { CanvasUtil, Context, FillOrStrokeOrClear } from '../..';

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
    async execute (ctx: Context, [name, t, style, x, y, w, h, r]) {
        const canvas = name
            ? ctx.canvasManager?.get(name)
                : !name && ctx.canvasManager?.current?.length !== 0 
                    ? ctx.canvasManager?.current?.[ctx.canvasManager?.current?.length - 1] : null;
        
        if (!canvas)
            return this.customError('No canvas');

        if (!style && (t === FillOrStrokeOrClear.fill || t === FillOrStrokeOrClear.stroke))
            return this.customError('No style provided.');

        const styleT = t === FillOrStrokeOrClear.fill ? 'fillStyle' : 'strokeStyle',
              oldstyle = canvas.ctx[styleT];

        canvas.ctx[styleT] = await CanvasUtil.parseStyle(this, ctx, canvas, style) ?? '#000000';
        canvas.rect(t, x, y, w, h, r.length === 1 ? r[0] : r);
        canvas.ctx[styleT] = oldstyle;

        return this.success();
    }
});
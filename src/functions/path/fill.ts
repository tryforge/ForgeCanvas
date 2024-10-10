import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { CanvasUtil, Context, FillRule } from '../..';

export default new NativeFunction({
    name: '$fill',
    description: 'Fills the current path.',
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
            name: 'style',
            description: 'The style. (color/gradient/pattern)',
            type: ArgType.String,
            required: true,
            rest: false
        },
        {
            name: 'fillRule',
            description: 'The fill rule',
            type: ArgType.Enum,
            enum: FillRule,
            required: false,
            rest: false
        }
    ],
    async execute (ctx: Context, [name, style, rule]) {
        const canvas = name
            ? ctx.canvasManager?.get(name)
                : !name && ctx.canvasManager?.current?.length !== 0 
                    ? ctx.canvasManager?.current?.[ctx.canvasManager?.current?.length - 1] : null;
        
        if (!canvas)
            return this.customError('No canvas');

        const oldstyle = canvas.ctx.fillStyle;

        canvas.ctx.fillStyle = await CanvasUtil.parseStyle(this, ctx, canvas, style);
        canvas.ctx.fill((typeof rule === 'number' ? FillRule[rule] : rule) as CanvasFillRule);
        canvas.ctx.fillStyle = oldstyle;

        return this.success();
    }
});
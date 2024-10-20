import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { CanvasUtil, Context } from '../..';

export default new NativeFunction({
    name: '$stroke',
    aliases: ['$strokePath', '$pathStroke'],
    description: 'Strokes (outlines) the current path.',
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
        }
    ],
    async execute (ctx: Context, [name, style]) {
        const canvas = name
            ? ctx.canvasManager?.get(name)
                : !name && ctx.canvasManager?.current?.length !== 0 
                    ? ctx.canvasManager?.current?.[ctx.canvasManager?.current?.length - 1] : null;
        
        if (!canvas)
            return this.customError('No canvas');

        const oldstyle = canvas.ctx.strokeStyle;

        canvas.ctx.strokeStyle = await CanvasUtil.parseStyle(this, ctx, canvas, style);
        canvas.ctx.stroke();
        canvas.ctx.strokeStyle = oldstyle;

        return this.success();
    }
});
import { NativeFunction, ArgType, Return } from '@tryforge/forgescript';
import { CanvasUtil, FCError } from '../..';

export default new NativeFunction({
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
    async execute (ctx, [name, style]) {
        const canvas = name
            ? ctx.canvasManager?.get(name)
            : ctx.canvasManager?.lastCurrent;
        if (!canvas) return this.customError(FCError.NoCanvas);

        const oldstyle = canvas.ctx.strokeStyle,
              s = await CanvasUtil.resolveStyle(this, ctx, canvas, style);
        if (s instanceof Return) return s;

        canvas.ctx.strokeStyle = s;
        canvas.ctx.stroke();
        canvas.ctx.strokeStyle = oldstyle;

        return this.success();
    }
});
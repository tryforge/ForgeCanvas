import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { FCError } from '../../classes';

export default new NativeFunction({
    name: '$lineWidth',
    aliases: ['$strokeWidth'],
    description: 'Sets or returns the line width in a canvas.',
    version: '1.0.0',
    brackets: false,
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
            name: 'width',
            description: 'The new line width.',
            type: ArgType.Number,
            required: false,
            rest: false
        }
    ],
    execute (ctx, [name, width]) {
        const canvas = name
            ? ctx.canvasManager?.get(name)
            : ctx.canvasManager?.lastCurrent;

        if (!canvas) return this.customError(FCError.NoCanvas);
        if (!width) return this.success(canvas.ctx.lineWidth);

        canvas.ctx.lineWidth = width;
        return this.success();
    }
});
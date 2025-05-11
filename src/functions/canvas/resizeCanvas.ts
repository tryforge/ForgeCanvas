import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { FCError } from '../../classes';

export default new NativeFunction({
    name: '$resizeCanvas',
    aliases: ['$canvasResize'],
    description: 'Resizes a canvas.',
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
            name: 'width',
            description: 'The new canvas width.',
            type: ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'height',
            description: 'The new canvas height.',
            type: ArgType.Number,
            required: true,
            rest: false
        },
    ],
    execute (ctx, [name, w, h]) {
        const canvas = name
            ? ctx.canvasManager?.get(name)
            : ctx.canvasManager?.lastCurrent;
        if (!canvas) return this.customError(FCError.NoCanvas);

        canvas.resize(w,h);
        return this.success();
    }
});
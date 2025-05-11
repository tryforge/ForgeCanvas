import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { FCError } from '../../classes';

export default new NativeFunction({
    name: '$opacity',
    aliases: ['$globalAlpha', '$alpha'],
    description: 'Sets or returns the opacity in a canvas.',
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
            name: 'opacity',
            description: 'The new opacity.',
            type: ArgType.Number,
            required: false,
            rest: false
        }
    ],
    execute (ctx, [name, opacity]) {
        const canvas = (name
            ? ctx.canvasManager?.get(name)
            : ctx.canvasManager?.lastCurrent)?.ctx;
        if (!canvas) return this.customError(FCError.NoCanvas);

        return this.success(opacity
            ? (canvas.globalAlpha = opacity / 100, undefined)
            : canvas.globalAlpha
        );
    }
});
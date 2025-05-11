import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { FCError } from '../../classes';

export default new NativeFunction({
    name: '$wordSpacing',
    description: 'Sets or returns the spacing between words when drawing text.',
    version: '1.0.0',
    aliases: ["$wordSpace"],
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
            name: 'spacing',
            description: 'The new spacing.',
            type: ArgType.Number,
            required: false,
            rest: false
        }
    ],
    execute (ctx, [name, spacing]) {
        const canvas = (name
            ? ctx.canvasManager?.get(name)
            : ctx.canvasManager?.lastCurrent)?.ctx;
        if (!canvas) return this.customError(FCError.NoCanvas);
 
        return this.success(spacing
            ? (canvas.wordSpacing = `${spacing}px`, undefined) 
            : canvas.wordSpacing
        );
    }
});
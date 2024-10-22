import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { Context } from '../..';

export default new NativeFunction({
    name: '$lineDash',
    description: 'Sets or returns the line dash segments in a canvas.',
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
            name: 'segments',
            description: 'The new line dash segments.',
            type: ArgType.Json,
            required: false,
            rest: false
        }
    ],
    async execute (ctx: Context, [name, segments]) {
        const canvas = name
            ? ctx.canvasManager?.get(name)
                : !name && ctx.canvasManager?.current?.length !== 0 
                    ? ctx.canvasManager?.current?.[ctx.canvasManager?.current?.length - 1] : null;
        
        if (!canvas)
            return this.customError('No canvas');

        if (segments && (!Array.isArray(segments) || !segments.every(x => typeof x === 'number')))
            return this.customError('Invalid segments.');

        return this.success(segments 
            ? (canvas.ctx.setLineDash(segments), undefined)
            : canvas.ctx.getLineDash()
        );
    }
});
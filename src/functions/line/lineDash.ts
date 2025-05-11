import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { FCError } from '../../classes';

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
    execute (ctx, [name, segments]) {
        const canvas = (name
            ? ctx.canvasManager?.get(name)
            : ctx.canvasManager?.lastCurrent)?.ctx;
        if (!canvas) return this.customError(FCError.NoCanvas);

        if (segments && (!Array.isArray(segments) || !segments.every(x => typeof x === 'number')))
            return this.customError(FCError.InvalidLineDashSegments);

        return this.success(segments 
            ? (canvas.setLineDash(segments), undefined)
            : canvas.getLineDash()
        );
    }
});
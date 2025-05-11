import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { FCError } from '../../classes';

export default new NativeFunction({
    name: '$imageSmoothing',
    description: 'Sets or returns the image smoothing in a canvas.',
    version: '1.0.0',
    aliases: ["$imageSmooth"],
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
            name: 'enabled',
            description: 'Determines whether scaled images are smoothed or not.',
            type: ArgType.Boolean,
            required: false,
            rest: false
        }
    ],
    execute (ctx, [name, enabled]) {
        const canvas = (name
            ? ctx.canvasManager?.get(name)
            : ctx.canvasManager?.lastCurrent)?.ctx;
        if (!canvas) return this.customError(FCError.NoCanvas);

        return this.success(enabled
            ? (canvas.imageSmoothingEnabled = enabled, undefined)
            : canvas.imageSmoothingEnabled
        );
    }
});
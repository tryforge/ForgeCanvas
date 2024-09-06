import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { Context } from '../../';

export default new NativeFunction({
    name: '$imageSmoothing',
    description: 'Sets or returns the image smoothing in a canvas.',
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
            name: 'enabled',
            description: 'Determines whether scaled images are smoothed or not.',
            type: ArgType.Boolean,
            required: false,
            rest: false
        }
    ],
    async execute (ctx: Context, [name, enabled]) {
        const canvas = (name
            ? ctx.canvasManager?.get(name)
                : !name && ctx.canvasManager?.current?.length !== 0 
                    ? ctx.canvasManager?.current?.[ctx.canvasManager?.current?.length - 1] : null)?.ctx;
        
        if (!canvas)
            return this.customError('No canvas');

        return this.success(enabled
            ? (canvas.imageSmoothingEnabled = enabled, undefined)
            : canvas.imageSmoothingEnabled
        );
    }
});
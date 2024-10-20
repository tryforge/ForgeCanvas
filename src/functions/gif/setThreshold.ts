import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { Context } from '../../';

export default new NativeFunction({
    name: '$setThreshold',
    description: 'Sets if the color table should be reused if the current frame matches the previous frame.',
    version: '1.1.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'gif',
            description: 'Name of the GIF.',
            type: ArgType.String,
            required: false,
            rest: false
        },
        {
            name: 'percentage',
            description: 'Threshold percentage.',
            type: ArgType.Number,
            required: true,
            rest: false
        }
    ],
    async execute(ctx: Context, [gifName, percentage]) {
        // Ensure the GIFManager is properly initialized and the specified GIF exists
        const gif = gifName
            ? ctx.gifManager?.get(gifName)
                : !gifName && ctx.gifManager?.current?.length !== 0 
                    ? ctx.gifManager?.current?.[ctx.gifManager?.current?.length - 1] : null;

        if (!gif) {
            return this.customError('No GIF with the provided name found.');
        }

        // Validate the percentage value
        if (percentage < 0 || percentage > 100) {
            return this.customError('Threshold percentage must be between 0 and 100.');
        }

        // Set the threshold for the GIF
        await gif.setThreshold(percentage);

        return this.success();
    }
});
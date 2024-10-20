import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { Context } from '../../';

export default new NativeFunction({
    name: '$setFrameRate',
    aliases: ['$setFPS', '$setFramesPerSecond'],
    description: 'Sets the FPS (Frames Per Second) of a GIF.',
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
            name: 'frames',
            description: 'Number of frames per second to display.',
            type: ArgType.Number,
            required: true,
            rest: false
        }
    ],
    async execute(ctx: Context, [gifName, fps]) {
        // Ensure the GIFManager is properly initialized and the specified GIF exists
        const gif = gifName
            ? ctx.gifManager?.get(gifName)
                : !gifName && ctx.gifManager?.current?.length !== 0 
                    ? ctx.gifManager?.current?.[ctx.gifManager?.current?.length - 1] : null;

        if (!gif) {
            return this.customError('No GIF.');
        }

        // Set the FPS of the GIF
        gif.setFrameRate(fps);

        return this.success();
    }
});
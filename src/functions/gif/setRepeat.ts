import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { Context } from '../../';

export default new NativeFunction({
    name: '$setRepeat',
    aliases: ['$setLoops'],
    description: 'Sets the number of loops a GIF does.',
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
            name: 'loops',
            description: 'The number of loops.',
            type: ArgType.Number,
            required: true,
            rest: false
        }
    ],
    async execute(ctx: Context, [gifName, loops]) {
        // Ensure the GIFManager is properly initialized and the specified GIF exists
        const gif = gifName
            ? ctx.gifManager?.get(gifName)
                : !gifName && ctx.gifManager?.current?.length !== 0 
                    ? ctx.gifManager?.current?.[ctx.gifManager?.current?.length - 1] : null;

        if (!gif) {
            return this.customError('No GIF with the provided name found.');
        }

        // Set the number of loops for the GIF
        await gif.setRepeat(loops);

        return this.success();
    }
});
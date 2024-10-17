import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { Context } from '../..';

export default new NativeFunction({
    name: '$setDelay',
    description: 'Sets the GIF display frame delay.',
    version: '1.2.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'gif',
            description: 'Name of the GIF.',
            type: ArgType.String,
            required: true,
            rest: false
        },
        {
            name: 'delay',
            description: 'Number of milliseconds to display the frame.',
            type: ArgType.Number,
            required: true,
            rest: false
        }
    ],
    async execute(ctx: Context, [gifName, delay]) {
        const gif = ctx.gifManager?.get(gifName);

        if (!gif) {
            return this.customError('No GIF with the provided name found.');
        }

        await gif.setDelay(delay);

        return this.success();
    }
});

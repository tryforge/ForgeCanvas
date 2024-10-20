import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { Context } from '../..';

export default new NativeFunction({
    name: '$setDelay',
    description: 'Sets the GIF display frame delay.',
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
            name: 'delay',
            description: 'Number of milliseconds to display the frame.',
            type: ArgType.Number,
            required: true,
            rest: false
        }
    ],
    async execute(ctx: Context, [gifName, delay]) {
        const gif = gifName
            ? ctx.gifManager?.get(gifName)
                : !gifName && ctx.gifManager?.current?.length !== 0 
                    ? ctx.gifManager?.current?.[ctx.gifManager?.current?.length - 1] : null;

        if (!gif) {
            return this.customError('No GIF.');
        }

        await gif.setDelay(delay);

        return this.success();
    }
});
import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { Context } from '../../';

export default new NativeFunction({
    name: '$gifFinish',
    description: 'Finishes the GIF.',
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
        }
    ],
    async execute(ctx: Context, [gifName]) {
        const gif = ctx.gifManager?.get(gifName);

        if (!gif) {
            return this.customError('No GIF with the provided name found.');
        }

        gif.finish();

        return this.success();
    }
});

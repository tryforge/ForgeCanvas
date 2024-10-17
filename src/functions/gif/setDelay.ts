import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { GIFManager, Context } from '../..';

export default new NativeFunction({
    name: '$setQuality',
    description: 'Sets the GIF color quality.',
    version: '1.2.0',
    brackets: false,
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
            name: 'quality',
            description: 'The quality. (0-30)',
            type: ArgType.Number,
            required: true,
            rest: false
        }
    ],
    async execute(ctx: Context, [name, quality]) {
        const gif = ctx.gifManager?.get(name);

        if (!gif) {
            return this.customError('No GIF with provided name found.');
        }

        if (quality < 0 || quality > 30) {
            return this.customError('Quality must be between 0 and 30.');
        }

        await gif.setQuality(quality);

        return this.success();
    }
});

import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { FCError } from '../../classes';

export default new NativeFunction({
    name: '$setEncoderLoops',
    aliases: [
        '$setEncoderRepeat',
        '$setGIFEncoderRepeat',
        '$setGIFEncoderLoops',
        '$setLoops',
        '$setRepeat'
    ],
    description: 'Sets the number of loops for the GIF Encoder.',
    version: '1.2.0',
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
            description: 'Number of loops.',
            type: ArgType.Number,
            required: true,
            rest: false
        }
    ],
    execute (ctx, [name, loops]) {
        const gif = name
            ? ctx.gifManager?.getEncoder(name)
            : ctx.gifManager?.lastCurrentEncoder;
        if (!gif) return this.customError(FCError.NoEncoder);

        gif.setRepeat(loops);
        return this.success();
    }
});
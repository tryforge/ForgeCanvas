import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { Context } from '../..';

export default new NativeFunction({
    name: '$setEncoderLoops',
    aliases: ['$setEncoderRepeat', '$setGIFEncoderRepeat', '$setGIFEncoderLoops', '$setLoops', '$setRepeat'],
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
    async execute (ctx: Context, [name, loops]) {
        const gif = name
            ? ctx.gifManager?.getEncoder(name)
                : !name && ctx.gifManager?.currentEncoder?.length !== 0 
                    ? ctx.gifManager?.currentEncoder?.[ctx.gifManager?.currentEncoder?.length - 1] : null;
        
        if (!gif) return this.customError('No gif');

        gif.setRepeat(loops);
        return this.success();
    }
});
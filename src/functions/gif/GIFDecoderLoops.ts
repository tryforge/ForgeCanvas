import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { Context } from '../..';

export default new NativeFunction({
    name: '$GIFDecoderLoops',
    aliases: ['$decoderLoops'],
    description: 'Returns the number of loops of the GIF Decoder.',
    version: '1.2.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'gif',
            description: 'Name of the Decoder.',
            type: ArgType.String,
            required: true,
            rest: false
        }
    ],
    async execute (ctx: Context, [name]) {
        const gif = ctx.gifManager?.getDecoder(name);
        if (!gif) return this.customError('No gif');

        return this.success(gif.loops);
    }
}); 
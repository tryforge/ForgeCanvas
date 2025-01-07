import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { Context } from '../..';

export default new NativeFunction({
    name: '$GIFDecoderBGColor',
    aliases: ['$decoderBGColor', '$GIFDecoderBackgroundColor', '$decoderBackgroundColor', '$GIFDecoderBackground', '$decoderBackground'],
    description: 'Returns the background color of the GIF Decoder.',
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

        return this.success(gif.bgColor);
    }
});
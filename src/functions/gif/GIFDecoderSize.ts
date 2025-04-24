import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { WidthOrHeight } from '../..';

export default new NativeFunction({
    name: '$GIFDecoderSize',
    aliases: ['$decoderSize'],
    description: 'Returns the size of the GIF Decoder.',
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
        },
        {
            name: 'property',
            description: 'The size property to return.',
            type: ArgType.Enum,
            enum: WidthOrHeight,
            required: false,
            rest: false
        }
    ],
    async execute (ctx, [name, property]) {
        const gif = ctx.gifManager?.getDecoder(name);
        if (!gif) return this.customError('No gif');

        return this.success(property !== null // @ts-ignore
            ? gif[WidthOrHeight[
                (typeof property === 'string' ? WidthOrHeight[property] : property) as any
            ]]
            : JSON.stringify({ width: gif.width, height: gif.height })
        );
    }
}); 
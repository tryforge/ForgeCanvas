import { ArgType, NativeFunction } from '@tryforge/forgescript';
import { Decoder } from '@gifsx/gifsx';
import { DecoderOption, FCError } from '../..';

export default new NativeFunction({
    name: '$GIFDecoderOption',
    aliases: ['$decoderOption', '$GIFDecoderProperty', '$decoderProperty'],
    description: 'Sets or returns a GIF Frame option.',
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
            name: 'option',
            description: 'Option to get.',
            type: ArgType.Enum,
            enum: DecoderOption,
            required: true,
            rest: false
        }
    ],
    execute (ctx, [name, option]) {
        const gif = ctx.gifManager?.getDecoder(name);
        if (!gif) return this.customError(FCError.NoDecoder);

        const opt = gif?.[
            (typeof option === 'number'
                ? DecoderOption[option] : option
            ) as unknown as keyof Decoder
        ];

        if (opt instanceof Uint8ClampedArray || opt instanceof ArrayBuffer) {
            if (opt instanceof Uint8ClampedArray)
                return this.success(`[${Array.from(opt).join(', ')}]`);
            
            return this.success(`[${Array.from(new Uint8Array(opt)).join(', ')}]`);
        };
        
        return this.success(opt);
    }
});
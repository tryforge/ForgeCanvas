import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { indexedToHex } from '@gifsx/gifsx';

export default new NativeFunction({
    name: '$indexedToHex',
    description: 'Converts indexed pixels to HEX',
    version: '1.2.1',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'palette',
            description: 'The palette to use for the conversion.',
            type: ArgType.Json,
            required: true,
            rest: false
        },
        {
            name: 'transparent',
            description: 'The index of the transparent color in the palette.',
            type: ArgType.Number,
            required: false,
            rest: false
        },
        {
            name: 'alwaysAlpha',
            description: 'Determines whether to always include the alpha channel in the output. (default: false)',
            type: ArgType.Boolean,
            required: false,
            rest: false
        },
        {
            name: 'allowShort',
            description: 'Whether to allow short hex output. (default: false)',
            type: ArgType.Boolean,
            required: false,
            rest: false
        },
        {
            name: 'pixels',
            description: 'The pixels to convert into HEX.',
            type: ArgType.Number,
            check: (x: number) => x >= 0 && x <= 255,
            required: true,
            rest: true
        }
    ],
    async execute (_, [palette, transparent, aua, a_s, pixels]) {
        try {
            const res = indexedToHex(Uint8Array.from(pixels), Uint8Array.from(palette as unknown as number[]), transparent, aua ?? false, a_s ?? false);
            return this.success(`[${res.map(x => `"${x}"`).join(', ')}]`);
        } catch(e) {
            return this.customError((e as any).toString());
        }
    }
});
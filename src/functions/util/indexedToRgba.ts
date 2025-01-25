import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { indexedToRgba } from '@gifsx/gifsx';

export default new NativeFunction({
    name: '$indexedToRgba',
    description: 'Converts indexed pixels to RGBA',
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
            name: 'pixels',
            description: 'The pixels to convert into RGBA.',
            type: ArgType.Number,
            check: (x: number) => x >= 0 && x <= 255,
            required: true,
            rest: true
        }
    ],
    async execute (_, [palette, transparent, pixels]) {
        try {
            const res = indexedToRgba(Uint8Array.from(pixels), Uint8Array.from(palette as unknown as number[]), transparent);
            return this.success(`[${res.join(', ')}]`);
        } catch(e) {
            return this.customError((e as any).toString());
        }
    }
});
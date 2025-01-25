import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { rgbaToHex } from '@gifsx/gifsx';

export default new NativeFunction({
    name: '$rgbaToHex',
    description: 'Converts RGBA into HEX.',
    version: '1.2.1',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'alwaysIncludeAlpha',
            description: 'Whether to always include the alpha channel in the output. (default: false)',
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
            name: 'rgba',
            description: 'The RGBA to convert into HEX.',
            type: ArgType.Number,
            check: (x: number) => x >= 0 && x <= 255,
            required: true,
            rest: true
        }
    ],
    async execute (_, [aia, a_s, rgba]) {
        try {
            const res = rgbaToHex(Uint8Array.from(rgba), aia ?? false, a_s ?? false);
            return this.success(`[${res.map(x => `"${x}"`).join(', ')}]`);
        } catch(e) {
            return this.customError((e as any).toString());
        }
    }
});
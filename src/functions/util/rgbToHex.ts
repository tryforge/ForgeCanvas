import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { rgbToHex } from '@gifsx/gifsx';

export default new NativeFunction({
    name: '$rgbToHex',
    description: 'Converts RGB into HEX.',
    version: '1.2.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'allowShort',
            description: 'Whether to allow short hex output. (default: false)',
            type: ArgType.Boolean,
            required: false,
            rest: false
        },
        {
            name: 'rgba',
            description: 'The RGB to convert into HEX.',
            type: ArgType.Number,
            check: (x: number) => x >= 0 && x <= 255,
            required: true,
            rest: true
        }
    ],
    async execute (_, [a_s, rgb]) {
        try {
            const res = rgbToHex(rgb, a_s ?? false);
            return this.success(`[${res.map(x => `"${x}"`).join(', ')}]`);
        } catch(e) {
            return this.customError((e as any).toString());
        }
    }
});
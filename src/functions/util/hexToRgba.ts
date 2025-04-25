import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { hexToRgba } from '@gifsx/gifsx';

export default new NativeFunction({
    name: '$hexToRgba',
    description: 'Converts HEX into RGBA.',
    version: '1.2.1',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'hex',
            description: 'The hex to convert into RGBA.',
            type: ArgType.String,
            required: true,
            rest: true
        }
    ],
    execute (_, [hex]) {
        try {
            const res = hexToRgba(hex);
            return this.success(`[${res.join(', ')}]`);
        } catch(e) {
            return this.customError((e as any).toString());
        }
    }
});
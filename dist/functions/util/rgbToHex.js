"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const gifsx_1 = require("@gifsx/gifsx");
exports.default = new forgescript_1.NativeFunction({
    name: '$rgbToHex',
    description: 'Converts RGB into HEX.',
    version: '1.2.1',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'allowShort',
            description: 'Whether to allow short hex output. (default: false)',
            type: forgescript_1.ArgType.Boolean,
            required: false,
            rest: false
        },
        {
            name: 'rgba',
            description: 'The RGB to convert into HEX.',
            type: forgescript_1.ArgType.Number,
            check: (x) => x >= 0 && x <= 255,
            required: true,
            rest: true
        }
    ],
    execute(_, [a_s, rgb]) {
        try {
            const res = (0, gifsx_1.rgbToHex)(Uint8Array.from(rgb), a_s ?? false);
            return this.success(`[${res.map(x => `"${x}"`).join(', ')}]`);
        }
        catch (e) {
            return this.customError(e.toString());
        }
    }
});

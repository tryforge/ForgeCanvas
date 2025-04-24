"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const gifsx_1 = require("@gifsx/gifsx");
exports.default = new forgescript_1.NativeFunction({
    name: '$indexedToHex',
    description: 'Converts indexed pixels to HEX',
    version: '1.2.1',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'palette',
            description: 'The palette to use for the conversion.',
            type: forgescript_1.ArgType.Json,
            required: true,
            rest: false
        },
        {
            name: 'transparent',
            description: 'The index of the transparent color in the palette.',
            type: forgescript_1.ArgType.Number,
            required: false,
            rest: false
        },
        {
            name: 'alwaysAlpha',
            description: 'Determines whether to always include the alpha channel in the output. (default: false)',
            type: forgescript_1.ArgType.Boolean,
            required: false,
            rest: false
        },
        {
            name: 'allowShort',
            description: 'Whether to allow short hex output. (default: false)',
            type: forgescript_1.ArgType.Boolean,
            required: false,
            rest: false
        },
        {
            name: 'pixels',
            description: 'The pixels to convert into HEX.',
            type: forgescript_1.ArgType.Number,
            check: (x) => x >= 0 && x <= 255,
            required: true,
            rest: true
        }
    ],
    async execute(_, [palette, transparent, aua, a_s, pixels]) {
        try {
            const res = (0, gifsx_1.indexedToHex)(Uint8Array.from(pixels), Uint8Array.from(palette), transparent, aua ?? false, a_s ?? false);
            return this.success(`[${res.map(x => `"${x}"`).join(', ')}]`);
        }
        catch (e) {
            return this.customError(e.toString());
        }
    }
});

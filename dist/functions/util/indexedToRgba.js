"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const gifsx_1 = require("@gifsx/gifsx");
exports.default = new forgescript_1.NativeFunction({
    name: '$indexedToRgba',
    description: 'Converts indexed pixels to RGBA',
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
            name: 'pixels',
            description: 'The pixels to convert into RGBA.',
            type: forgescript_1.ArgType.Number,
            check: (x) => x >= 0 && x <= 255,
            required: true,
            rest: true
        }
    ],
    async execute(_, [palette, transparent, pixels]) {
        try {
            const res = (0, gifsx_1.indexedToRgba)(Uint8Array.from(pixels), Uint8Array.from(palette), transparent);
            return this.success(`[${res.join(', ')}]`);
        }
        catch (e) {
            return this.customError(e.toString());
        }
    }
});

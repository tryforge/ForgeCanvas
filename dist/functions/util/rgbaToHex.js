"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const gifsx_1 = require("@gifsx/gifsx");
exports.default = new forgescript_1.NativeFunction({
    name: '$rgbaToHex',
    description: 'Converts RGBA into HEX.',
    version: '1.2.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'alwaysIncludeAlpha',
            description: 'Whether to always include the alpha channel in the output. (default: false)',
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
            name: 'rgba',
            description: 'The RGBA to convert into HEX.',
            type: forgescript_1.ArgType.Number,
            check: (x) => x >= 0 && x <= 255,
            required: true,
            rest: true
        }
    ],
    async execute(_, [aia, a_s, rgba]) {
        try {
            const res = (0, gifsx_1.rgbaToHex)(rgba, aia ?? false, a_s ?? false);
            return this.success(`[${res.map(x => `"${x}"`).join(', ')}]`);
        }
        catch (e) {
            return this.customError(e.toString());
        }
    }
});
//# sourceMappingURL=rgbaToHex.js.map
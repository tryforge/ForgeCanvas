"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const gifsx_1 = require("@gifsx/gifsx");
exports.default = new forgescript_1.NativeFunction({
    name: '$hexToRgba',
    description: 'Converts HEX into RGBA.',
    version: '1.2.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'hex',
            description: 'The hex to convert into RGBA.',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: true
        }
    ],
    async execute(_, [hex]) {
        try {
            const res = (0, gifsx_1.hexToRgba)(hex);
            return this.success(`[${res.join(', ')}]`);
        }
        catch (e) {
            return this.customError(e.toString());
        }
    }
});
//# sourceMappingURL=hexToRgba.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const gifsx_1 = require("@gifsx/gifsx");
exports.default = new forgescript_1.NativeFunction({
    name: '$hexToRgb',
    description: 'Converts HEX into RGB.',
    version: '1.2.1',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'hex',
            description: 'The hex to convert into RGB.',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: true
        }
    ],
    async execute(_, [hex]) {
        try {
            const res = (0, gifsx_1.hexToRgb)(hex);
            return this.success(`[${res.join(', ')}]`);
        }
        catch (e) {
            return this.customError(e.toString());
        }
    }
});

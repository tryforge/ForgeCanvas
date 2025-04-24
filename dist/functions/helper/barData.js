"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: '$barData',
    description: 'Adds data for progress bars.',
    version: '1.2.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'value',
            description: 'Value for the data segment (percentage or absolute).',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false
        },
        {
            name: 'style',
            description: 'Style for the data segment.',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false
        }
    ],
    execute(ctx, [value, style]) {
        const numericValue = Number.parseFloat(value);
        if (Number.isNaN(numericValue) || numericValue < 0)
            return this.customError('Invalid value for bar data.');
        const barData = (ctx.getEnvironmentKey('progressBarData') || []);
        barData.push({ value: numericValue, style });
        ctx.setEnvironmentKey('progressBarData', barData);
        return this.success();
    }
});

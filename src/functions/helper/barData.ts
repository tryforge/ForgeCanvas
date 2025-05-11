import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { BarData, FCError } from '../..';

export default new NativeFunction({
    name: '$barData',
    description: 'Adds data for progress bars.',
    version: '1.2.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'value',
            description: 'Value for the data segment (percentage or absolute).',
            type: ArgType.String,
            required: true,
            rest: false
        },
        {
            name: 'style',
            description: 'Style for the data segment.',
            type: ArgType.String,
            required: true,
            rest: false
        }
    ],
    execute(ctx, [value, style]) {
        const numericValue = Number.parseFloat(value);

        if (Number.isNaN(numericValue) || numericValue < 0)
            return this.customError(FCError.InvalidBarData);

        const barData = (ctx.getEnvironmentKey('progressBarData') || []) as BarData[];
        barData.push({ value: numericValue, style });

        ctx.setEnvironmentKey('progressBarData', barData);
        return this.success();
    }
});

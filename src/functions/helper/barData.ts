import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { Context } from '../..';

// Function to retrieve bar data from the environment (or an empty array if not set)
export function getBarData(ctx: Context) {
    const envData = ctx.setEnvironmentKey('progressBarData');
    if (envData) {
        return JSON.parse(envData); // Parse and return the saved bar data from the environment
    }
    return []; // Return an empty array if no data is saved
}

// Native function to add data for progress bars
export default new NativeFunction({
    name: '$barData',
    description: 'Adds data for progress bars.',
    version: '1.0.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'label',
            description: 'Label for the data segment.',
            type: ArgType.String,
            required: true,
            rest: false
        },
        {
            name: 'value',
            description: 'Value for the data segment (percentage or absolute).',
            type: ArgType.String,
            required: true,
            rest: false
        },
        {
            name: 'color',
            description: 'Color for the data segment.',
            type: ArgType.String,
            required: true,
            rest: false
        }
    ],
    execute(ctx: Context, [label, value, color]) {
        const numericValue = parseFloat(value.replace('%', ''));

        if (isNaN(numericValue) || numericValue < 0) {
            return this.customError('Invalid value for bar data.');
        }

        // Retrieve the existing bar data from the environment
        const barData = JSON.parse(ctx.setEnvironmentKey('progressBarData') || '[]');

        // Add the new data to the bar data array
        barData.push({ label, value: numericValue, color });

        // Save the updated bar data to the environment
        ctx.setEnvironmentKey('progressBarData', JSON.stringify(barData));

        return this.success(`Bar data added: ${label} (${numericValue}%, ${color}).`);
    }
});

import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { Context } from '../..';

// Function to retrieve bar options from the environment (or default options if not set)
export function getBarOptions(ctx: Context) {
    const envOptions = ctx.setEnvironmentKey('progressBarOptions');
    if (envOptions) {
        return JSON.parse(envOptions); // Parse and return the saved options from the environment
    }

    // Default bar options if not set in the environment
    return {
        type: 'normal',
        height: 20,
        maxWidth: 200,
        background: '#FFFFFF',
        radius: 0
    };
}

// Native function to set options for progress bars
export default new NativeFunction({
    name: '$barOptions',
    description: 'Sets options for progress bars.',
    version: '1.0.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'option',
            description: 'Option name (type, height, maxWidth, background, radius).',
            type: ArgType.String,
            required: true,
            rest: false
        },
        {
            name: 'value',
            description: 'Value for the option.',
            type: ArgType.String,
            required: true,
            rest: false
        }
    ],
    execute(ctx: Context, [option, value]) {
        // Retrieve the existing bar options from the environment
        const barOptions = JSON.parse(ctx.setEnvironmentKey('progressBarOptions') || '{}');

        // Update the specified option
        switch (option) {
            case 'type':
                barOptions.type = value;
                break;
            case 'height':
                barOptions.height = parseFloat(value);
                break;
            case 'maxWidth':
                barOptions.maxWidth = parseFloat(value);
                break;
            case 'background':
                barOptions.background = value;
                break;
            case 'radius':
                barOptions.radius = parseFloat(value);
                break;
            default:
                return this.customError(`Unknown bar option: ${option}`);
        }

        // Save the updated options to the environment
        ctx.setEnvironmentKey('progressBarOptions', JSON.stringify(barOptions));

        return this.success(`Bar option "${option}" set to "${value}".`);
    }
});

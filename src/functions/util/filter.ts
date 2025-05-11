import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { FCError, FilterMethod, Filters } from '../..';

export default new NativeFunction({
    name: '$filter',
    description: 'Use filters in your canvas.',
    version: '1.0.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'canvas',
            description: 'Name of the canvas.',
            type: ArgType.String,
            required: false,
            rest: false
        },
        {
            name: 'method',
            description: 'The method.',
            type: ArgType.Enum,
            enum: FilterMethod,
            required: true,
            rest: false
        },
        {
            name: 'filter',
            description: 'Name of the filter.',
            type: ArgType.Enum,
            enum: Filters,
            required: false,
            rest: false
        },
        {
            name: 'value',
            description: 'Filter\'s value.',
            type: ArgType.String,
            required: false,
            rest: false
        }
    ],
    execute (ctx, [name, method, filter, value]) {
        const canvas = name
            ? ctx.canvasManager?.get(name)
            : ctx.canvasManager?.lastCurrent;
        if (!canvas) return this.customError(FCError.NoCanvas);

        const res = canvas.filter(method, filter, value);
        return this.success(typeof res === 'object'
            ? JSON.stringify(res) : res
        );
    }
});
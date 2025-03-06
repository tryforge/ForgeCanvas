import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { Context, MeasureTextProperty } from '../..';

export default new NativeFunction({
    name: '$measureText',
    description: 'Measures text.',
    version: '1.0.0',
    brackets: false,
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
            name: 'text',
            description: 'The text to measure.',
            type: ArgType.String,
            required: true,
            rest: false
        },
        {
            name: 'font',
            description: 'The font.',
            type: ArgType.String,
            required: true,
            rest: false
        },
        {
            name: 'property',
            description: 'The result\'s property to return.',
            type: ArgType.Enum,
            enum: MeasureTextProperty,
            required: false,
            rest: false
        }
    ],
    async execute (ctx: Context, [name, text, font, property]) {
        const canvas = name
            ? ctx.canvasManager?.get(name)
            : ctx.canvasManager?.lastCurrent;
        if (!canvas) return this.customError('No canvas');

        const res = canvas.measureText(text, font) as Record<string, any>;
        return this.success(property !== null
            ? res[MeasureTextProperty[
                (typeof property === 'string' ? MeasureTextProperty[property] : property) as any
            ]]
            : JSON.stringify(res)
        );
    }
});
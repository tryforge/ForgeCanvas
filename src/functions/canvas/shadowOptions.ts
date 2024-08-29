import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { Context } from '../..';

export default new NativeFunction({
    name: '$shadowOptions',
    description: 'Sets or returns the shadow options in a canvas.',
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
            name: 'options',
            description: 'The options.',
            type: ArgType.Json,
            required: true,
            rest: false
        }
    ],
    async execute (ctx: Context, [name, options]) {
        const canvas = (name
            ? ctx.canvasManager?.get(name)
                : !name && ctx.canvasManager?.current?.length !== 0 
                    ? ctx.canvasManager?.current?.[ctx.canvasManager?.current?.length - 1] : null)?.ctx;
        
        if (!canvas)
            return this.customError('No canvas');

        const shadowOptions: Record<string, any> = {
            color: canvas.shadowColor,
            blur: canvas.shadowBlur,
            offsetX: canvas.shadowOffsetX,
            offsetY: canvas.shadowOffsetY
        };

        const res: any[] = [];
        if (!Array.isArray(options))
            Object.keys(options).forEach(x => shadowOptions[x] = options[x]);
        else options.forEach(x => res.push(shadowOptions?.[x]));

        return this.success(Array.isArray(options) ? JSON.stringify(res) : undefined);
    }
});
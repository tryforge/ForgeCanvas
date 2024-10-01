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
        
        if (typeof options === 'string') options = JSON.parse(options);

        const shadowOptions: Record<string, 'shadowColor' | 'shadowBlur' | 'shadowOffsetX' | 'shadowOffsetY'> = {
            color: 'shadowColor',
            blur: 'shadowBlur',
            offsetX: 'shadowOffsetX',
            offsetY: 'shadowOffsetY'
        };

        const res: any[] = [];
        if (!Array.isArray(options)) // @ts-ignore
            Object.keys(options).forEach(x => canvas[shadowOptions?.[x]] = options[x]);
        else options.forEach(x => res.push(canvas[shadowOptions[x]]));

        return this.success(Array.isArray(options) ? JSON.stringify(res) : undefined);
    }
});
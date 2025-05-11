import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { FCError } from '../../classes';

export default new NativeFunction({
    name: '$shadowOptions',
    aliases: ['$shadowConfig'],
    description: 'Sets or returns the shadow options in a canvas.',
    version: '1.1.0',
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
            description: 'The options. (color, blur, offsetX, offsetY)',
            type: ArgType.Json,
            required: true,
            rest: false
        }
    ],
    execute (ctx, [name, options]) {
        const canvas = (name
            ? ctx.canvasManager?.get(name)
            : ctx.canvasManager?.lastCurrent)?.ctx;

        if (!canvas) return this.customError(FCError.NoCanvas);
        if (typeof options === 'string') options = JSON.parse(options);

        const shadowOptions: Record<string, 'shadowColor' | 'shadowBlur' | 'shadowOffsetX' | 'shadowOffsetY'> = {
            color: 'shadowColor',
            blur: 'shadowBlur',
            offsetX: 'shadowOffsetX',
            offsetY: 'shadowOffsetY'
        };
        
        const res: any[] = [];
        if (!Array.isArray(options)) {
            for (const option in options) // @ts-ignore
                canvas[shadowOptions?.[option]] = options[option];
        } else for (const option in options)
            res.push(canvas[shadowOptions[option]]);

        return this.success(Array.isArray(options)
            ? JSON.stringify(res) : undefined
        );
    }
});

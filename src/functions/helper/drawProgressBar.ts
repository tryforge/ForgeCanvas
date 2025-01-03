import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { Context, CanvasUtil } from '../..';

export default new NativeFunction({
    name: '$drawProgressBar',
    description: 'Draws a progress bar.',
    version: '1.2.0',
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
            name: 'progress',
            description: 'The progress. (percentages)',
            type: ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'x',
            description: 'The X coordinate.',
            type: ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'y',
            description: 'The Y coordinate.',
            type: ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'width',
            description: 'The width.',
            type: ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'height',
            description: 'The height.',
            type: ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'options',
            description: 'The progress bar configuration.',
            type: ArgType.Json,
            required: true,
            rest: false
        },
    ],
    async execute (ctx: Context, [name, progress, x, y, width, height, options]) {
        const canvas = name
            ? ctx.canvasManager?.get(name)
                : !name && ctx.canvasManager?.current?.length !== 0 
                    ? ctx.canvasManager?.current?.[ctx.canvasManager?.current?.length - 1] : null;

        if (!canvas) return this.customError('No canvas');

        if (options.style)
            options.style = await CanvasUtil.parseStyle(this, ctx, canvas, options.style as any) ?? '#000000';
        if (options.left)
            options.left = await CanvasUtil.parseStyle(this, ctx, canvas, options.left as any) ?? '#000000';
        if ((options.background as any).style) // @ts-ignore
            options.background.style = await CanvasUtil.parseStyle(this, ctx, canvas, options.background.style as any) ?? '#000000';

        return this.success(JSON.stringify(
            canvas.drawProgressBar(x, y, width, height, progress, options ?? undefined)
        ));
    }
});
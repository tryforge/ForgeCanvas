import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { BarData, BarOptions, CanvasUtil } from '../..';

export default new NativeFunction({
    name: '$drawProgressBar',
    description: 'Creates and draws progress bars on a canvas.',
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
            name: 'config',
            description: 'The progress bar configuration.',
            type: ArgType.Json,
            required: true,
            rest: false
        },
    ],
    async execute(ctx, [name, x, y, width, height]) {
        const canvas = name
            ? ctx.canvasManager?.get(name)
            : ctx.canvasManager?.lastCurrent;
        if (!canvas) return this.customError('No canvas');

        const data: BarData[] = (ctx.getEnvironmentKey('progressBarData') ?? []) as BarData[]; 
        const options = (ctx.getEnvironmentKey('progressBarOptions') ?? {}) as BarOptions;
        const type = options.type ?? 'normal';

        let res: any;
        if (type === 'normal') {
            const progress = data[0];
            res = canvas.drawProgressBar(
                x, y, width, height,
                progress.value,
                {
                    style: await CanvasUtil.parseStyle(
                        this, ctx, canvas,
                        progress.style as any
                    ) ?? '#000000',
                    background: {
                        enabled: Object.keys(options).find(x => x.startsWith('background')) !== undefined,
                        style: await CanvasUtil.parseStyle(
                            this, ctx, canvas,
                            options['background-style'] as any
                        ) ?? '#000000',
                        radius: options['background-radius'],
                        padding: options['background-padding'],
                        type: options['background-type']
                    },
                    type: options['draw-type'],
                    radius: options.radius,
                    direction: options.direction,
                    clip: options['clip-radius'],
                    left: options.left
                }
            );
        } else {
            res = canvas.drawPieChart(
                x, y, width, height,
                data,
                {
                    type: options['draw-type'] === 'clear' ? 'fill' : options['draw-type'],
                    background: {
                        enabled: Object.keys(options).find(x => x.startsWith('background')) !== undefined,
                        style: await CanvasUtil.parseStyle(
                            this, ctx, canvas,
                            options['background-style'] as any
                        ) ?? '#000000',
                        radius: options['background-radius'],
                        padding: options['background-padding'],
                        type: options['background-type']
                    },
                    radius: Array.isArray(options.radius)
                        ? options.radius[0] : options.radius ?? 0,
                    left: options.left
                }
            );
        };

        ctx.deleteEnvironmentKey('progressBarData');
        return this.success(res ? JSON.stringify(res) : undefined);
    }
});

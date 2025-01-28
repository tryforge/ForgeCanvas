import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { Context, ImageFormat } from '../..';

export default new NativeFunction({
    name: '$canvasDataUrl',
    description: 'Returns buffer of a canvas.',
    version: '1.2.2',
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
            name: 'format',
            description: 'The image format.',
            type: ArgType.Enum,
            enum: ImageFormat,
            required: false,
            rest: false
        }
    ],
    async execute (ctx: Context, [name, f]) {
        const canvas = name ? ctx.canvasManager?.get(name)
            : !name && ctx.canvasManager?.current?.length !== 0 
                ? ctx.canvasManager?.current?.[ctx.canvasManager?.current?.length - 1] : null;
        if (!canvas) return this.customError('No canvas');

        return this.success(canvas.dataUrl((f !== null 
            ? 'image/' + (typeof f === 'number' ? ImageFormat[f] : f)
        : 'image/png') as any));
    }
});
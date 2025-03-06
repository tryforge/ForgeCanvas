import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { Context, ImageFormat } from '../..';

export default new NativeFunction({
    name: '$canvasBuffer',
    description: 'Returns buffer of a canvas.',
    version: '1.2.0',
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
        const canvas = name
            ? ctx.canvasManager?.get(name)
            : ctx.canvasManager?.lastCurrent;
        if (!canvas) return this.customError('No canvas');

        return this.success(`[${Array.from(canvas.buffer(
            (f !== null 
                ? 'image/' + (typeof f === 'number' ? ImageFormat[f] : f)
            : 'image/png') as any
        )).join(', ')}]`);
    }
});
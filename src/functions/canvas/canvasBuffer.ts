import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { Context, ImageFormat } from '../..';

export default new NativeFunction({
    name: '$canvasBuffer',
    description: 'Saves a canvas to a file.',
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
                : !name && ctx.canvasManager?.current?.length !== 0 
                    ? ctx.canvasManager?.current?.[ctx.canvasManager?.current?.length - 1] : null;
        
        if (!canvas) return this.customError('No canvas');

        return this.success(`[${Array.from(canvas.ctx.canvas.toBuffer(
            (f !== null 
                ? 'image/' + (typeof f === 'number' ? ImageFormat[f] : f)
            : 'image/png') as any
        )).join(', ')}]`);
    }
});
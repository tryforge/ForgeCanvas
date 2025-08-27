import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { FCError, ImageFormat } from '../..';

export default new NativeFunction({
    name: '$canvasBuffer',
    description: 'Stores the current canvas buffer.',
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
            name: 'variable name',
            description: 'The variable to load it to, accessed with $env[name]',
            type: ArgType.String,
            required: true,
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
    execute (ctx, [name, vname, f]) {
        const canvas = name
            ? ctx.canvasManager?.get(name)
            : ctx.canvasManager?.lastCurrent;
        if (!canvas) return this.customError(FCError.NoCanvas);

        ctx.setEnvironmentKey(vname, canvas.buffer(
            (f !== null 
                ? 'image/' + (typeof f === 'number' ? ImageFormat[f] : f)
            : 'image/png') as any
        ));
        return this.success();
    }
});
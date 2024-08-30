import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { Context, LineJoinShape } from '../../';

export default new NativeFunction({
    name: '$lineJoin',
    description: 'Sets or returns the line join shape in a canvas.',
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
            name: 'shape',
            description: 'The new shape.',
            type: ArgType.Enum,
            enum: LineJoinShape,
            required: false,
            rest: false
        }
    ],
    async execute (ctx: Context, [name, shape]) {
        const canvas = (name
            ? ctx.canvasManager?.get(name)
                : !name && ctx.canvasManager?.current?.length !== 0 
                    ? ctx.canvasManager?.current?.[ctx.canvasManager?.current?.length - 1] : null)?.ctx;
        
        if (!canvas)
            return this.customError('No canvas');

        return this.success(shape
            ? (canvas.lineJoin = (typeof shape === 'number' 
                ? LineJoinShape[shape]
                : shape
            ) as CanvasLineJoin, undefined) : canvas.lineJoin
        );
    }
});
import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { LineJoinShape } from '../..';

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
    async execute (ctx, [name, shape]) {
        const canvas = (name
            ? ctx.canvasManager?.get(name)
            : ctx.canvasManager?.lastCurrent)?.ctx;
        if (!canvas) return this.customError('No canvas');

        return this.success(shape
            ? (canvas.lineJoin = (typeof shape === 'number' 
                ? LineJoinShape[shape]
                : shape
            ) as CanvasLineJoin, undefined) : canvas.lineJoin
        );
    }
});
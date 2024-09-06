import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { Context } from '../../';

export default new NativeFunction({
    name: '$quadraticCurveTo',
    description: 'Draws a quadratic Bézier curve in the current path.',
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
            name: 'cx',
            description: 'The X coordinate of the control point.',
            type: ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'cy',
            description: 'The Y coordinate of the control point.',
            type: ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'x',
            description: 'The X coordinate of the end point.',
            type: ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'y',
            description: 'The Y coordinate of the end point.',
            type: ArgType.Number,
            required: true,
            rest: false
        }
    ],
    async execute (ctx: Context, [name, cx, cy, x, y]) {
        const canvas = name
            ? ctx.canvasManager?.get(name)
                : !name && ctx.canvasManager?.current?.length !== 0 
                    ? ctx.canvasManager?.current?.[ctx.canvasManager?.current?.length - 1] : null;
        
        if (!canvas)
            return this.customError('No canvas');

        canvas.ctx.quadraticCurveTo(cx, cy, x, y);
        return this.success();
    }
});
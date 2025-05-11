import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { FCError } from '../../classes';

export default new NativeFunction({
    name: '$bezierCurveTo',
    aliases: ['$bezierCurve', '$bezierLineTo'],
    description: 'Draws a cubic Bézier curve in the current path.',
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
            name: 'cx1',
            description: 'The X coordinate of the first control point.',
            type: ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'cy1',
            description: 'The Y coordinate of the first control point.',
            type: ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'cx2',
            description: 'The X coordinate of the second control point.',
            type: ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'cy2',
            description: 'The Y coordinate of the second control point.',
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
    execute (ctx, [name, ...args]) {
        const canvas = name
            ? ctx.canvasManager?.get(name)
            : ctx.canvasManager?.lastCurrent;
        if (!canvas) return this.customError(FCError.NoCanvas);

        canvas.ctx.bezierCurveTo(...args);
        return this.success();
    }
});
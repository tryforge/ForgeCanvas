import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { FCError } from '../../classes';

export default new NativeFunction({
    name: '$arc',
    description: 'Draws a circular arc in the current path.',
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
            name: 'x',
            description: 'The X coordinate of the arc\'s center.',
            type: ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'y',
            description: 'The Y coordinate of the arc\'s center.',
            type: ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'radius',
            description: 'The arc\'s radius. Must be positive.',
            type: ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'startAngle',
            description: 'The angle at which the arc starts in radians.',
            type: ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'endAngle',
            description: 'The angle at which the arc ends in radians.',
            type: ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'counterclockwise',
            description: 'An optional boolean value. If true, draws the arc counter-clockwise between the start and end angles.',
            type: ArgType.Boolean,
            required: false,
            rest: false
        }
    ],
    execute (ctx, [name, x, y, r, start, end, ccw]) {
        const canvas = name
            ? ctx.canvasManager?.get(name)
            : ctx.canvasManager?.lastCurrent;
        if (!canvas) return this.customError(FCError.NoCanvas);

        canvas.ctx.arc(x, y, r, start, end, ccw ?? false);
        return this.success();
    }
});
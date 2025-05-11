import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { FCError } from '../../classes';

export default new NativeFunction({
    name: '$ellipse',
    aliases: ['$elArc'],
    description: 'Draws a eliiptical arc in the current path.',
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
            description: 'The X coordinate of the ellipse\'s center.',
            type: ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'y',
            description: 'The Y coordinate of the ellipse\'s center.',
            type: ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'radiusX',
            description: 'The ellipse\'s major-axis radius. Must be positive.',
            type: ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'radiusY',
            description: 'The ellipse\'s minor-axis radius. Must be positive.',
            type: ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'rotation',
            description: 'The rotation of the ellipse, expressed in radians.',
            type: ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'startAngle',
            description: 'The eccentric angle at which the ellipse starts.',
            type: ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'endAngle',
            description: 'The eccentric angle at which the ellipse ends.',
            type: ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'counterclockwise',
            description: 'An optional boolean value. If true, draws the ellipse counter-clockwise between the start and end angles.',
            type: ArgType.Boolean,
            required: false,
            rest: false
        }
    ],
    execute (ctx, [name, x, y, rX, rY, rotation, sAngle, eAngle, ccw]) {
        const canvas = name
            ? ctx.canvasManager?.get(name)
            : ctx.canvasManager?.lastCurrent;
        if (!canvas) return this.customError(FCError.NoCanvas);

        canvas.ctx.ellipse(x, y, rX, rY, rotation, sAngle, eAngle, ccw ?? false);
        return this.success();
    }
});
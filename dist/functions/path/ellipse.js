"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: '$arc',
    description: 'Draws a circular arc in the current path.',
    version: '1.0.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'canvas',
            description: 'Name of the canvas.',
            type: forgescript_1.ArgType.String,
            required: false,
            rest: false
        },
        {
            name: 'x',
            description: 'The X coordinate of the ellipse\'s center.',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'y',
            description: 'The Y coordinate of the ellipse\'s center.',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'radiusX',
            description: 'The ellipse\'s major-axis radius. Must be positive.',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'radiusY',
            description: 'The ellipse\'s minor-axis radius. Must be positive.',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'rotation',
            description: 'The rotation of the ellipse, expressed in radians.',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'startAngle',
            description: 'The eccentric angle at which the ellipse starts.',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'endAngle',
            description: 'The eccentric angle at which the ellipse ends.',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'counterclockwise',
            description: 'An optional boolean value. If true, draws the ellipse counter-clockwise between the start and end angles.',
            type: forgescript_1.ArgType.Boolean,
            required: false,
            rest: false
        }
    ],
    async execute(ctx, [name, x, y, rX, rY, rotation, sAngle, eAngle, ccw]) {
        const canvas = name
            ? ctx.canvasManager?.get(name)
            : !name && ctx.canvasManager?.current?.length !== 0
                ? ctx.canvasManager?.current?.[ctx.canvasManager?.current?.length - 1] : null;
        if (!canvas)
            return this.customError('No canvas');
        canvas.ctx.ellipse(x, y, rX, rY, rotation, sAngle, eAngle, ccw ?? false);
        return this.success();
    }
});
//# sourceMappingURL=ellipse.js.map
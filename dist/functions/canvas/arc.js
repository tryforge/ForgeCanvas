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
            description: 'The X coordinate of the arc\'s center.',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'y',
            description: 'The Y coordinate of the arc\'s center.',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'radius',
            description: 'The arc\'s radius. Must be positive.',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'startAngle',
            description: 'The angle at which the arc starts in radians.',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'endAngle',
            description: 'The angle at which the arc ends in radians.',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'counterclockwise',
            description: 'An optional boolean value. If true, draws the arc counter-clockwise between the start and end angles.',
            type: forgescript_1.ArgType.Boolean,
            required: false,
            rest: false
        }
    ],
    async execute(ctx, [name, x, y, r, start, end, ccw]) {
        const canvas = name
            ? ctx.canvasManager?.get(name)
            : !name && ctx.canvasManager?.current?.length !== 0
                ? ctx.canvasManager?.current?.[ctx.canvasManager?.current?.length - 1] : null;
        if (!canvas)
            return this.customError('No canvas');
        canvas.ctx.arc(x, y, r, start, end, ccw ?? false);
        return this.success();
    }
});
//# sourceMappingURL=arc.js.map
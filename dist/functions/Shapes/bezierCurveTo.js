"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: '$bezierCurveTo',
    description: 'Draws a cubic Bézier curve in the current path.',
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
            name: 'cx1',
            description: 'The X coordinate of the first control point.',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'cy1',
            description: 'The Y coordinate of the first control point.',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'cx2',
            description: 'The X coordinate of the second control point.',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'cy2',
            description: 'The Y coordinate of the second control point.',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'x',
            description: 'The X coordinate of the end point.',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'y',
            description: 'The Y coordinate of the end point.',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        }
    ],
    async execute(ctx, [name, ...args]) {
        const canvas = name
            ? ctx.canvasManager?.get(name)
            : !name && ctx.canvasManager?.current?.length !== 0
                ? ctx.canvasManager?.current?.[ctx.canvasManager?.current?.length - 1] : null;
        if (!canvas)
            return this.customError('No canvas');
        canvas.ctx.bezierCurveTo(...args);
        return this.success();
    }
});
//# sourceMappingURL=bezierCurveTo.js.map
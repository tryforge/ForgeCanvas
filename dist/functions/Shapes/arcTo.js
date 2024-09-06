"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: '$arcTo',
    description: 'Adds a circular arc in the current path.',
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
            name: 'x1',
            description: 'The X coordinate of the arc\'s start point.',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'y1',
            description: 'The Y coordinate of the arc\'s start point.',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'x2',
            description: 'The X coordinate of the arc\'s end point.',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'y2',
            description: 'The Y coordinate of the arc\'s end point.',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'radius',
            description: 'The arc\'s radius. Must be non-negative.',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        }
    ],
    async execute(ctx, [name, x1, y1, x2, y2, r]) {
        const canvas = name
            ? ctx.canvasManager?.get(name)
            : !name && ctx.canvasManager?.current?.length !== 0
                ? ctx.canvasManager?.current?.[ctx.canvasManager?.current?.length - 1] : null;
        if (!canvas)
            return this.customError('No canvas');
        canvas.ctx.arcTo(x1, y1, x2, y2, r);
        return this.success();
    }
});
//# sourceMappingURL=arcTo.js.map
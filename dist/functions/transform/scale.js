"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const classes_1 = require("../../classes");
exports.default = new forgescript_1.NativeFunction({
    name: '$scale',
    description: 'Adds a scaling transformation to the canvas.',
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
            description: 'Scaling factor in the horizontal direction',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'y',
            description: 'Scaling factor in the vertical direction',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        }
    ],
    execute(ctx, [name, x, y]) {
        const canvas = name
            ? ctx.canvasManager?.get(name)
            : ctx.canvasManager?.lastCurrent;
        if (!canvas)
            return this.customError(classes_1.FCError.NoCanvas);
        canvas.ctx.scale(x, y);
        return this.success();
    }
});

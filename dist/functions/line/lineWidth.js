"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const classes_1 = require("../../classes");
exports.default = new forgescript_1.NativeFunction({
    name: '$lineWidth',
    aliases: ['$strokeWidth'],
    description: 'Sets or returns the line width in a canvas.',
    version: '1.0.0',
    brackets: false,
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
            name: 'width',
            description: 'The new line width.',
            type: forgescript_1.ArgType.Number,
            required: false,
            rest: false
        }
    ],
    execute(ctx, [name, width]) {
        const canvas = name
            ? ctx.canvasManager?.get(name)
            : ctx.canvasManager?.lastCurrent;
        if (!canvas)
            return this.customError(classes_1.FCError.NoCanvas);
        if (!width)
            return this.success(canvas.ctx.lineWidth);
        canvas.ctx.lineWidth = width;
        return this.success();
    }
});

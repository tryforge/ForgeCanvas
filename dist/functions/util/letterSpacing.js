"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const classes_1 = require("../../classes");
exports.default = new forgescript_1.NativeFunction({
    name: '$letterSpacing',
    description: 'Sets or returns the spacing between letters when drawing text.',
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
            name: 'spacing',
            description: 'The new spacing.',
            type: forgescript_1.ArgType.Number,
            required: false,
            rest: false
        }
    ],
    async execute(ctx, [name, spacing]) {
        const canvas = (name
            ? ctx.canvasManager?.get(name)
            : ctx.canvasManager?.lastCurrent)?.ctx;
        if (!canvas)
            return this.customError(classes_1.FCError.NoCanvas);
        return this.success(spacing
            ? (canvas.letterSpacing = `${spacing}px`, undefined)
            : canvas.letterSpacing);
    }
});

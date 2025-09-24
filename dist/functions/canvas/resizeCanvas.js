"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const classes_1 = require("../../classes");
exports.default = new forgescript_1.NativeFunction({
    name: '$resizeCanvas',
    aliases: ['$canvasResize'],
    description: 'Resizes a canvas.',
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
            name: 'width',
            description: 'The new canvas width.',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'height',
            description: 'The new canvas height.',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        },
    ],
    execute(ctx, [name, w, h]) {
        const canvas = name
            ? ctx.canvasManager?.get(name)
            : ctx.canvasManager?.lastCurrent;
        if (!canvas)
            return this.customError(classes_1.FCError.NoCanvas);
        canvas.resize(w, h);
        return this.success();
    }
});

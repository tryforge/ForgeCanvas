"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const classes_1 = require("../../classes");
exports.default = new forgescript_1.NativeFunction({
    name: '$opacity',
    aliases: ['$globalAlpha', '$alpha'],
    description: 'Sets or returns the opacity in a canvas.',
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
            name: 'opacity',
            description: 'The new opacity.',
            type: forgescript_1.ArgType.Number,
            required: false,
            rest: false
        }
    ],
    execute(ctx, [name, opacity]) {
        const canvas = (name
            ? ctx.canvasManager?.get(name)
            : ctx.canvasManager?.lastCurrent)?.ctx;
        if (!canvas)
            return this.customError(classes_1.FCError.NoCanvas);
        return this.success(opacity
            ? (canvas.globalAlpha = opacity / 100, undefined)
            : canvas.globalAlpha);
    }
});

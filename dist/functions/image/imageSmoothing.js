"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const classes_1 = require("../../classes");
exports.default = new forgescript_1.NativeFunction({
    name: '$imageSmoothing',
    description: 'Sets or returns the image smoothing in a canvas.',
    version: '1.0.0',
    aliases: ["$imageSmooth"],
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
            name: 'enabled',
            description: 'Determines whether scaled images are smoothed or not.',
            type: forgescript_1.ArgType.Boolean,
            required: false,
            rest: false
        }
    ],
    execute(ctx, [name, enabled]) {
        const canvas = (name
            ? ctx.canvasManager?.get(name)
            : ctx.canvasManager?.lastCurrent)?.ctx;
        if (!canvas)
            return this.customError(classes_1.FCError.NoCanvas);
        return this.success(enabled
            ? (canvas.imageSmoothingEnabled = enabled, undefined)
            : canvas.imageSmoothingEnabled);
    }
});

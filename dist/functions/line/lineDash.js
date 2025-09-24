"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const classes_1 = require("../../classes");
exports.default = new forgescript_1.NativeFunction({
    name: '$lineDash',
    description: 'Sets or returns the line dash segments in a canvas.',
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
            name: 'segments',
            description: 'The new line dash segments.',
            type: forgescript_1.ArgType.Json,
            required: false,
            rest: false
        }
    ],
    execute(ctx, [name, segments]) {
        const canvas = (name
            ? ctx.canvasManager?.get(name)
            : ctx.canvasManager?.lastCurrent)?.ctx;
        if (!canvas)
            return this.customError(classes_1.FCError.NoCanvas);
        if (segments && (!Array.isArray(segments) || !segments.every(x => typeof x === 'number')))
            return this.customError(classes_1.FCError.InvalidLineDashSegments);
        return this.success(segments
            ? (canvas.setLineDash(segments), undefined)
            : canvas.getLineDash());
    }
});

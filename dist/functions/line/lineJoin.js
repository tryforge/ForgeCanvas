"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("../..");
exports.default = new forgescript_1.NativeFunction({
    name: '$lineJoin',
    description: 'Sets or returns the line join shape in a canvas.',
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
            name: 'shape',
            description: 'The new shape.',
            type: forgescript_1.ArgType.Enum,
            enum: __1.LineJoinShape,
            required: false,
            rest: false
        }
    ],
    execute(ctx, [name, shape]) {
        const canvas = (name
            ? ctx.canvasManager?.get(name)
            : ctx.canvasManager?.lastCurrent)?.ctx;
        if (!canvas)
            return this.customError(__1.FCError.NoCanvas);
        return this.success(shape
            ? (canvas.lineJoin = (typeof shape === 'number'
                ? __1.LineJoinShape[shape]
                : shape), undefined) : canvas.lineJoin);
    }
});

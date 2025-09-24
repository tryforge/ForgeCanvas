"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("../..");
exports.default = new forgescript_1.NativeFunction({
    name: '$canvasBuffer',
    description: 'Stores the current canvas buffer.',
    version: '1.2.0',
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
            name: 'variable name',
            description: 'The variable to load it to, accessed with $env[name]',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false
        },
        {
            name: 'format',
            description: 'The image format.',
            type: forgescript_1.ArgType.Enum,
            enum: __1.ImageFormat,
            required: false,
            rest: false
        }
    ],
    execute(ctx, [name, vname, f]) {
        const canvas = name
            ? ctx.canvasManager?.get(name)
            : ctx.canvasManager?.lastCurrent;
        if (!canvas)
            return this.customError(__1.FCError.NoCanvas);
        ctx.setEnvironmentKey(vname, canvas.buffer((f !== null
            ? 'image/' + (typeof f === 'number' ? __1.ImageFormat[f] : f)
            : 'image/png')));
        return this.success();
    }
});

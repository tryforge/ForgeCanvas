"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("../..");
exports.default = new forgescript_1.NativeFunction({
    name: '$textBaseline',
    description: 'Sets or returns the text baseline.',
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
            name: 'baseline',
            description: 'The new baseline.',
            type: forgescript_1.ArgType.Enum,
            enum: __1.TextBaseline,
            required: false,
            rest: false
        }
    ],
    execute(ctx, [name, baseline]) {
        const canvas = (name
            ? ctx.canvasManager?.get(name)
            : ctx.canvasManager?.lastCurrent)?.ctx;
        if (!canvas)
            return this.customError(__1.FCError.NoCanvas);
        return this.success(baseline !== null
            ? (canvas.textBaseline = (typeof baseline === 'number' ? __1.TextBaseline[baseline] : baseline), undefined) : typeof canvas.textBaseline === 'number'
            ? __1.TextBaseline[canvas.textBaseline]
            : canvas.textBaseline ?? 'bottom');
    }
});

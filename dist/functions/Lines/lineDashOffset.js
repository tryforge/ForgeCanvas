"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: '$lineDashOffset',
    description: 'Sets or returns the line dash offset in a canvas.',
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
            name: 'offset',
            description: 'The new offset.',
            type: forgescript_1.ArgType.Number,
            required: false,
            rest: false
        }
    ],
    async execute(ctx, [name, offset]) {
        const canvas = (name
            ? ctx.canvasManager?.get(name)
            : !name && ctx.canvasManager?.current?.length !== 0
                ? ctx.canvasManager?.current?.[ctx.canvasManager?.current?.length - 1] : null)?.ctx;
        if (!canvas)
            return this.customError('No canvas');
        return this.success(offset
            ? (canvas.lineDashOffset = offset, undefined)
            : canvas.lineDashOffset);
    }
});
//# sourceMappingURL=lineDashOffset.js.map
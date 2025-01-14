"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("../..");
exports.default = new forgescript_1.NativeFunction({
    name: '$canvasBuffer',
    description: 'Saves a canvas to a file.',
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
            name: 'format',
            description: 'The image format.',
            type: forgescript_1.ArgType.Enum,
            enum: __1.ImageFormat,
            required: false,
            rest: false
        }
    ],
    async execute(ctx, [name, f]) {
        const canvas = name
            ? ctx.canvasManager?.get(name)
            : !name && ctx.canvasManager?.current?.length !== 0
                ? ctx.canvasManager?.current?.[ctx.canvasManager?.current?.length - 1] : null;
        if (!canvas)
            return this.customError('No canvas');
        return this.success(`[${Array.from(canvas.ctx.canvas.toBuffer((f !== null
            ? 'image/' + (typeof f === 'number' ? __1.ImageFormat[f] : f)
            : 'image/png'))).join(', ')}]`);
    }
});
//# sourceMappingURL=canvasBuffer.js.map
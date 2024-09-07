"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("../..");
exports.default = new forgescript_1.NativeFunction({
    name: '$compositeOperation',
    description: 'Sets or returns the compositing operation in a canvas.',
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
            name: 'operation',
            description: 'The new compositing operation.',
            type: forgescript_1.ArgType.Enum,
            enum: __1.CompositingOperation,
            required: false,
            rest: false
        }
    ],
    async execute(ctx, [name, operation]) {
        const canvas = (name
            ? ctx.canvasManager?.get(name)
            : !name && ctx.canvasManager?.current?.length !== 0
                ? ctx.canvasManager?.current?.[ctx.canvasManager?.current?.length - 1] : null)?.ctx;
        if (!canvas)
            return this.customError('No canvas');
        return this.success(operation
            ? (canvas.globalCompositeOperation = (typeof operation === 'number'
                ? __1.CompositingOperation[operation]
                : operation), undefined) : canvas.globalCompositeOperation);
    }
});
//# sourceMappingURL=compositeOperation.js.map
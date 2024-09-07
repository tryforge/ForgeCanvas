"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("../..");
exports.default = new forgescript_1.NativeFunction({
    name: '$textAlign',
    description: 'Sets or returns the text align.',
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
            name: 'align',
            description: 'The new align.',
            type: forgescript_1.ArgType.Enum,
            enum: __1.TextAlign,
            required: false,
            rest: false
        }
    ],
    async execute(ctx, [name, align]) {
        const canvas = name
            ? ctx.canvasManager?.get(name)?.ctx
            : !name && ctx.canvasManager?.current?.length !== 0
                ? ctx.canvasManager?.current?.[ctx.canvasManager?.current?.length - 1]?.ctx : null;
        if (!canvas)
            return this.customError('No canvas');
        return this.success(align
            ? (canvas.textAlign = (typeof align === 'number' ? __1.TextAlign[align] : align),
                undefined) : __1.TextAlign[canvas.textAlign]);
    }
});
//# sourceMappingURL=textAlign.js.map
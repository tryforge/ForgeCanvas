"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("../../");
exports.default = new forgescript_1.NativeFunction({
    name: '$clip',
    description: 'Turns the current path into the current clipping region.',
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
            name: 'fillRule',
            description: 'The fill rule',
            type: forgescript_1.ArgType.Enum,
            enum: __1.FillRule,
            required: false,
            rest: false
        }
    ],
    async execute(ctx, [name, rule]) {
        const canvas = name
            ? ctx.canvasManager?.get(name)
            : !name && ctx.canvasManager?.current?.length !== 0
                ? ctx.canvasManager?.current?.[ctx.canvasManager?.current?.length - 1] : null;
        if (!canvas)
            return this.customError('No canvas');
        canvas.ctx.clip((typeof rule === 'number' ? __1.FillRule[rule] : rule));
        return this.success();
    }
});
//# sourceMappingURL=clip.js.map
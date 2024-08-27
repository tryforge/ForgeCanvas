"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("../../");
exports.default = new forgescript_1.NativeFunction({
    name: '$addColorStop',
    description: 'Adds a color stop to the gradient.',
    version: '1.0.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'name',
            description: 'Name of the gradient.',
            type: forgescript_1.ArgType.String,
            required: false,
            rest: false
        },
        {
            name: 'offset',
            description: 'The color stop offset.',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'color',
            description: 'Color of the stop.',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false
        }
    ],
    async execute(ctx, [name, offset, color]) {
        if (!(offset / 100 >= 0 && offset / 100 <= 1))
            return this.customError('Offset must be between 0 and 100');
        if (!ctx.gradientManager || !(ctx.gradientManager instanceof __1.GradientManager))
            ctx.gradientManager = new __1.GradientManager();
        const gradient = ctx.gradientManager?.get(name);
        if (name && !gradient)
            return this.customError(`No gradient`);
        if (gradient)
            gradient.addColorStop(offset, color);
        else
            ctx.gradientManager.stops.push([offset, color]);
        return this.success();
    }
});
//# sourceMappingURL=addColorStop.js.map
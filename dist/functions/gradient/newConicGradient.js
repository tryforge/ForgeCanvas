"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("../..");
exports.default = new forgescript_1.NativeFunction({
    name: '$newConicGradient',
    description: 'Creates a conic gradient.',
    version: '1.0.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'name',
            description: 'Name of the new gradient.',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false
        },
        {
            name: 'start',
            description: 'The angle at which to begin the gradient, in radians. The angle starts from a line going horizontally right from the center, and proceeds clockwise.',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'x',
            description: 'The X coordinate of the center of the gradient.',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'y',
            description: 'The Y coordinate of the center of the gradient.',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'stops',
            description: 'Color stops.',
            type: forgescript_1.ArgType.Number,
            required: false,
            rest: true
        }
    ],
    async execute(ctx, [name, sAngle, x, y]) {
        if (!ctx.gradientManager || !(ctx.gradientManager instanceof __1.GradientManager))
            ctx.gradientManager = new __1.GradientManager();
        ctx.gradientManager.set(name, __1.GradientType.conic, sAngle, x, y);
        ctx.gradientManager.stops.forEach(x => ctx.gradientManager?.get(name)?.addColorStop(...x));
        return this.success();
    }
});
//# sourceMappingURL=newConicGradient.js.map
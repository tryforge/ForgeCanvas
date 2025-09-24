"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("../..");
exports.default = new forgescript_1.NativeFunction({
    name: '$newLinearGradient',
    aliases: ['$createLinearGradient', '$linearGradient'],
    description: 'Creates a linear gradient.',
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
            name: 'x1',
            description: 'The X coordinate of the start point.',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'y1',
            description: 'The Y coordinate of the start point.',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'x2',
            description: 'The X coordinate of the end point.',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'y2',
            description: 'The Y coordinate of the end point.',
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
    execute(ctx, [name, x1, y1, x2, y2]) {
        if (!ctx.gradientManager || !(ctx.gradientManager instanceof __1.GradientManager))
            ctx.gradientManager = new __1.GradientManager();
        ctx.gradientManager.set(name, __1.GradientType.linear, x1, y1, x2, y2);
        for (const stop of ctx.gradientManager.stops)
            ctx.gradientManager?.get(name)?.addColorStop(...stop);
        ctx.gradientManager.stops = [];
        return this.success();
    }
});

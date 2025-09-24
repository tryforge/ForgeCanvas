"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const gifsx_1 = require("@gifsx/gifsx");
const __1 = require("../..");
exports.default = new forgescript_1.NativeFunction({
    name: '$newNeuQuant',
    aliases: ['$createNeuQuant', '$NeuQuant'],
    description: 'Creates a new NeuQuant instance.',
    version: '1.2.1',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'name',
            description: 'Name of the new NeuQuant instance.',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false
        },
        {
            name: 'sample',
            description: 'Sample factor.',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'maxColors',
            description: 'Maximum number of colors.',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'pixels',
            description: 'The pixels.',
            type: forgescript_1.ArgType.Json,
            required: true,
            rest: false
        }
    ],
    execute(ctx, [name, sample, maxColors, pixels]) {
        if (!ctx.neuquantManager || !(ctx.neuquantManager instanceof __1.NeuQuantManager))
            ctx.neuquantManager = new __1.NeuQuantManager();
        ctx.neuquantManager.set(name, new gifsx_1.NeuQuant(sample, maxColors, Uint8Array.from(pixels)));
        return this.success();
    }
});

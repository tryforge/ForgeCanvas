"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const classes_1 = require("../../classes");
exports.default = new forgescript_1.NativeFunction({
    name: '$NQmapPixel',
    aliases: ['$mapPixel'],
    description: 'Maps the rgba-pixel in-place to the best-matching color in the color map.',
    version: '1.2.1',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'name',
            description: 'Name of the NeuQuant instance.',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false
        },
        {
            name: 'r',
            description: 'The red value.',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'g',
            description: 'The green value.',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'b',
            description: 'The blue value.',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'a',
            description: 'The alpha value.',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        }
    ],
    execute(ctx, [name, r, g, b, a]) {
        const nq = ctx.neuquantManager?.get(name);
        if (!nq)
            return this.customError(classes_1.FCError.NoNeuQuant);
        nq.mapPixel(Uint8Array.from([r, g, b, a]));
        return this.success();
    }
});

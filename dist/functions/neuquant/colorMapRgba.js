"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const classes_1 = require("../../classes");
exports.default = new forgescript_1.NativeFunction({
    name: '$colorMapRgba',
    aliases: ['$NQcolorMapRgba'],
    description: 'Returns the RGBA color map calculated from the sample.',
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
        }
    ],
    execute(ctx, [name]) {
        const nq = ctx.neuquantManager?.get(name);
        if (!nq)
            return this.customError(classes_1.FCError.NoNeuQuant);
        return this.success(nq.colorMapRgba());
    }
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: '$colorMapRgb',
    aliases: ['$NQcolorMapRgb'],
    description: 'Returns the RGB color map calculated from the sample.',
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
    async execute(ctx, [name]) {
        const nq = ctx.neuquantManager?.get(name);
        if (!nq)
            return this.customError('No NeuQuant instance');
        return this.success(nq.colorMapRgb());
    }
});

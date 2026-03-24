"use strict";
/*
* SPDX-License-Identifier: LGPL-3.0-or-later
* Copyright © 2026 BotForge
*/
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("../..");
exports.default = new forgescript_1.NativeFunction({
    name: '$colorMapRgb',
    aliases: ['$NQcolorMapRgb'],
    description: 'Returns the RGB color map calculated from the sample',
    version: '1.2.1',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'name',
            description: 'Name of the NeuQuant instance',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false
        }
    ],
    execute(ctx, [name]) {
        const nq = ctx.neuquantManager?.get(name);
        if (!nq)
            return this.customError(__1.ForgeCanvasError.NoNeuQuant);
        return this.success(nq.colorMapRgb());
    }
});

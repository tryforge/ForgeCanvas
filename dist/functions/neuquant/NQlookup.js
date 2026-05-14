"use strict";
/*
* SPDX-License-Identifier: LGPL-3.0-or-later
* Copyright © 2026 BotForge
*/
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: '$NQlookup',
    description: 'Lookup pixel values for color at idx in the color map',
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
        },
        {
            name: 'idx',
            description: 'The index of the color in the colormap',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        }
    ],
    execute(ctx, [name, idx]) {
        const nq = ctx.neuquantManager?.get(name);
        if (!nq)
            return this.customError("No NeuQuant Instance with provided name found" /* ForgeCanvasError.NoNeuQuant */);
        return this.success(nq.lookup(idx));
    }
});

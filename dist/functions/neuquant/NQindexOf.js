"use strict";
/*
* SPDX-License-Identifier: LGPL-3.0-or-later
* Copyright © 2026 BotForge
*/
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("../..");
exports.default = new forgescript_1.NativeFunction({
    name: '$NQindexOf',
    description: 'Finds the best-matching index in the color map',
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
            name: 'r',
            description: 'The red value',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'g',
            description: 'The green value',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'b',
            description: 'The blue value',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'a',
            description: 'The alpha value',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        }
    ],
    execute(ctx, [name, r, g, b, a]) {
        const nq = ctx.neuquantManager?.get(name);
        if (!nq)
            return this.customError(__1.ForgeCanvasError.NoNeuQuant);
        return this.success(nq.indexOf(Uint8Array.from([r, g, b, a])));
    }
});

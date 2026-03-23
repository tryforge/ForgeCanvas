"use strict";
/*
* SPDX-License-Identifier: LGPL-3.0-or-later
* Copyright © 2026 BotForge
*/
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: '$deleteCanvas',
    aliases: ['$removeCanvas'],
    description: 'Deletes the canvas',
    version: '1.0.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'name',
            description: 'Name of the canvas',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false
        }
    ],
    execute(ctx, [name]) {
        ctx.canvasManager?.remove(name);
        return this.success();
    }
});

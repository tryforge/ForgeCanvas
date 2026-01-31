"use strict";
/*
* SPDX-License-Identifier: LGPL-3.0-or-later
* Copyright © 2026 BotForge
*/
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const classes_1 = require("../../classes");
exports.default = new forgescript_1.NativeFunction({
    name: '$cropCanvas',
    aliases: ['$canvasCrop', '$canvasTrim', '$trimCanvas'],
    description: 'Crops a canvas.',
    version: '1.0.0',
    brackets: false,
    unwrap: true,
    args: [
        {
            name: 'canvas',
            description: 'Name of the canvas',
            type: forgescript_1.ArgType.String,
            required: false,
            rest: false
        },
        {
            name: 'top',
            description: 'Whether to trim the top (true by default)',
            type: forgescript_1.ArgType.Boolean,
            required: false,
            rest: false,
            version: '1.3.0'
        },
        {
            name: 'left',
            description: 'Whether to trim the left (true by default)',
            type: forgescript_1.ArgType.Boolean,
            required: false,
            rest: false,
            version: '1.3.0'
        },
        {
            name: 'right',
            description: 'Whether to trim the right (true by default)',
            type: forgescript_1.ArgType.Boolean,
            required: false,
            rest: false,
            version: '1.3.0'
        },
        {
            name: 'bottom',
            description: 'Whether to trim the bottom (true by default)',
            type: forgescript_1.ArgType.Boolean,
            required: false,
            rest: false,
            version: '1.3.0'
        }
    ],
    execute(ctx, [name, top, left, right, bottom]) {
        const canvas = name
            ? ctx.canvasManager?.get(name)
            : ctx.canvasManager?.lastCurrent;
        if (!canvas)
            return this.customError(classes_1.FCError.NoCanvas);
        return this.success(canvas.trim(top !== false, left !== false, right !== false, bottom !== false));
    }
});

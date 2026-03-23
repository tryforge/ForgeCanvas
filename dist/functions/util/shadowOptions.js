"use strict";
/*
* SPDX-License-Identifier: LGPL-3.0-or-later
* Copyright © 2026 BotForge
*/
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("../..");
exports.default = new forgescript_1.NativeFunction({
    name: '$shadowOptions',
    aliases: ['$shadowConfig'],
    description: 'Sets or returns the shadow options in a canvas',
    version: '1.1.0',
    brackets: true,
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
            name: 'options',
            description: 'The options (color, blur, offsetX, offsetY)',
            type: forgescript_1.ArgType.Json,
            required: true,
            rest: false
        }
    ],
    execute(ctx, [name, options]) {
        const canvas = ctx.canvasManager?.getOrCurrent(name)?.ctx;
        if (!canvas)
            return this.customError(__1.ForgeCanvasError.NoCanvas);
        if (typeof options === 'string')
            options = JSON.parse(options);
        const shadowOptions = {
            color: 'shadowColor',
            blur: 'shadowBlur',
            offsetX: 'shadowOffsetX',
            offsetY: 'shadowOffsetY'
        };
        const res = [];
        if (!Array.isArray(options)) {
            for (const option in options) // @ts-ignore
                canvas[shadowOptions?.[option]] = options[option];
        }
        else
            for (const option in options)
                res.push(canvas[shadowOptions[option]]);
        return this.success(Array.isArray(options)
            ? JSON.stringify(res) : undefined);
    }
});

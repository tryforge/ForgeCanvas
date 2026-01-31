"use strict";
/*
* SPDX-License-Identifier: LGPL-3.0-or-later
* Copyright © 2026 BotForge
*/
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("../..");
exports.default = new forgescript_1.NativeFunction({
    name: '$measureText',
    description: 'Measures text.',
    version: '1.0.0',
    brackets: false,
    unwrap: true,
    args: [
        {
            name: 'canvas',
            description: 'Name of the canvas.',
            type: forgescript_1.ArgType.String,
            required: false,
            rest: false
        },
        {
            name: 'text',
            description: 'The text to measure.',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false
        },
        {
            name: 'font',
            description: 'The font.',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false
        },
        {
            name: 'property',
            description: 'The result\'s property to return.',
            type: forgescript_1.ArgType.Enum,
            enum: __1.MeasureTextProperty,
            required: false,
            rest: false
        }
    ],
    async execute(ctx, [name, text, font, property]) {
        const canvas = (name
            ? ctx.canvasManager?.get(name)
            : ctx.canvasManager?.lastCurrent)?.ctx;
        if (!canvas)
            return this.customError(__1.FCError.NoCanvas);
        const valid = __1.CanvasUtil.validateFont(font);
        if (!valid || typeof valid === 'string')
            return this.customError(valid);
        canvas.font = font;
        const res = canvas.measureText(text);
        return this.success(property !== null
            ? res[__1.MeasureTextProperty[(typeof property === 'string' ? __1.MeasureTextProperty[property] : property)]]
            : JSON.stringify(res));
    }
});

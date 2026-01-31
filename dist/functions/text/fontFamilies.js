"use strict";
/*
* SPDX-License-Identifier: LGPL-3.0-or-later
* Copyright © 2026 BotForge
*/
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const canvas_1 = require("@napi-rs/canvas");
exports.default = new forgescript_1.NativeFunction({
    name: '$fontFamilies',
    aliases: ['$fontFam', '$fonts', '$fontNames'],
    description: 'Returns a list of the available fonts.',
    version: '1.0.0',
    brackets: false,
    unwrap: true,
    args: [{
            name: 'separator',
            description: 'The font separator.',
            type: forgescript_1.ArgType.String,
            required: false,
            rest: false
        }],
    execute(_, [sep]) {
        return this.success(canvas_1.GlobalFonts.families
            .map(x => x?.family)
            .join(sep ?? ', '));
    }
});

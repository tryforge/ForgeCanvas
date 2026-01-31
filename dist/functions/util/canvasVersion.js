"use strict";
/*
* SPDX-License-Identifier: LGPL-3.0-or-later
* Copyright © 2026 BotForge
*/
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const package_json_1 = require("../../../package.json");
const package_json_2 = require("@napi-rs/canvas/package.json");
exports.default = new forgescript_1.NativeFunction({
    name: '$canvasVersion',
    description: 'Returns the forge.canvas version.',
    version: '1.1.0',
    brackets: false,
    unwrap: true,
    args: [
        {
            name: '@napi-rs/canvas',
            description: 'Returns the @napi-rs/canvas version used by forge.canvas instead if true.',
            type: forgescript_1.ArgType.Boolean,
            rest: false,
            required: false,
            version: '1.3.0'
        }
    ],
    execute(_, [canvas]) { return this.success(canvas ? package_json_2.version : package_json_1.version); }
});

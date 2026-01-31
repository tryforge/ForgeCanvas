"use strict";
/*
* SPDX-License-Identifier: LGPL-3.0-or-later
* Copyright © 2026 BotForge
*/
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const canvas_1 = require("@napi-rs/canvas");
const classes_1 = require("../../classes");
exports.default = new forgescript_1.NativeFunction({
    name: '$clearCanvasCache',
    description: 'Clears all canvas caches',
    version: '1.3.0',
    brackets: false,
    unwrap: true,
    args: [],
    execute() {
        classes_1.charWidthCache.clear();
        classes_1.wordWidthCache.clear();
        (0, canvas_1.clearAllCache)();
        return this.success();
    }
});

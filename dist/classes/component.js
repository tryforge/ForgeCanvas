"use strict";
/*
* SPDX-License-Identifier: LGPL-3.0-or-later
* Copyright © 2026 BotForge
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasComponent = void 0;
const forgescript_1 = require("@tryforge/forgescript");
class CanvasComponent {
    name;
    #code;
    get code() { return this.#code; }
    /**
     * The compiled code.
     */
    compiled;
    constructor(component) {
        this.name = component.name;
        this.#code = component.code;
        this.compiled = forgescript_1.Compiler.compile(this.#code);
    }
}
exports.CanvasComponent = CanvasComponent;

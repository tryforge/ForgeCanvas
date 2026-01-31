/*
* SPDX-License-Identifier: LGPL-3.0-or-later
* Copyright © 2026 BotForge
*/

import { Compiler, IExtendedCompilationResult } from '@tryforge/forgescript';

export interface ICanvasComponent {
    /**
     * The name of the component.
     */
    name: string;
    /**
     * The code of the component.
     */
    code: string;
}

export class CanvasComponent implements ICanvasComponent {
    public name: string;
    #code: string;
    get code() { return this.#code }

    /**
     * The compiled code.
     */
    public compiled: IExtendedCompilationResult;

    constructor(component: ICanvasComponent) {
        this.name = component.name;
        this.#code = component.code;
        this.compiled = Compiler.compile(this.#code);
        console.log(this.compiled);
    }
}

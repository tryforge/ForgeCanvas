"use strict";
/*
* SPDX-License-Identifier: LGPL-3.0-or-later
* Copyright © 2026 BotForge
*/
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("../..");
exports.default = new forgescript_1.NativeFunction({
    name: '$renderCanvasComponent',
    aliases: ['$renderComponent'],
    description: 'Renders a Canvas Component on the provided coordinates',
    version: '1.3.0',
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
            name: 'component',
            description: 'Name of the component',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false
        },
        {
            name: 'x',
            description: 'The X coordinate',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'y',
            description: 'The Y coordinate',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'options',
            description: 'The options of the component',
            type: forgescript_1.ArgType.Unknown,
            required: false,
            rest: true
        }
    ],
    async execute(ctx, [cname, name, x, y, options]) {
        const canvas = cname
            ? ctx.canvasManager?.get(cname)
            : ctx.canvasManager?.lastCurrent;
        if (!canvas)
            return this.customError(__1.FCError.NoCanvas);
        const cctx = canvas.ctx;
        const component = __1.ForgeCanvas.components.get(name);
        if (!component)
            return this.customError(__1.FCError.NoComponent);
        let oldmatrix;
        if (x || y) {
            oldmatrix = cctx.getTransform();
            cctx.translate(x, y);
        }
        const { canvasManager } = ctx;
        const oldoptions = ctx.getEnvironmentKey('options');
        ctx.setEnvironmentKey('options', options);
        canvasManager.current.push(canvas);
        const { functions, code, resolve } = component.compiled;
        const args = new Array(functions.length);
        let content;
        if (ctx.runtime.data.functions.length) {
            try {
                for (let i = 0, len = functions.length; i < len; i++) {
                    const fn = functions[i];
                    const rt = await fn.execute(ctx);
                    args[i] = (!rt.success && !ctx.handleNotSuccess(fn, rt)) ? ctx["error"]() : rt.value;
                }
            }
            catch (err) {
                if (err instanceof Error)
                    forgescript_1.Logger.error(err);
                else if (err instanceof forgescript_1.Return && err.return)
                    if (err.return)
                        return err;
                return this.customError(err?.toString() ?? '');
            }
            content = resolve(args);
        }
        else
            content = code;
        canvasManager.current.pop();
        ctx.setEnvironmentKey('options', oldoptions);
        if (oldmatrix)
            cctx.setTransform(oldmatrix);
        return this.success(content);
    }
});

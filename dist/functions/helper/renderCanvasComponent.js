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
            type: forgescript_1.ArgType.String,
            required: false,
            rest: true
        }
    ],
    async execute(ctx, [cname, name, x, y, options]) {
        const canvas = ctx.canvasManager?.getOrCurrent(name);
        if (!canvas)
            return this.customError(__1.ForgeCanvasError.NoCanvas);
        const cctx = canvas.ctx;
        const component = __1.ForgeCanvas.components.get(name);
        if (!component)
            return this.customError(__1.ForgeCanvasError.NoComponent);
        let oldmatrix;
        if (x || y) {
            oldmatrix = cctx.getTransform();
            cctx.translate(x, y);
        }
        const canvasManager = ctx.canvasManager;
        const previous = canvasManager.current;
        canvasManager.current = canvas;
        const context = ctx.clone({
            data: component.compiled ?? forgescript_1.Compiler.compile(component.data.code, component.data.path),
            doNotSend: true,
            allowTopLevelReturn: true
        });
        context.canvasManager = canvasManager;
        context.imageManager = ctx.imageManager;
        context.gradientManager = ctx.gradientManager;
        context.gifManager = ctx.gifManager;
        context.lottieManager = ctx.lottieManager;
        context.neuquantManager = ctx.neuquantManager;
        const params = Array.isArray(component.data.params) ? component.data.params : [];
        const required = params.filter(param => typeof param === 'string' || param.required !== false);
        if (options.length < required.length)
            return this.customError(`Calling custom function ${this.data.name} requires ${required.length} argument${required.length > 1 ? 's' : ''}, received ${options.length}`);
        for (let i = 0, len = params.length; i < len; i++) {
            const param = params[i];
            const name = typeof param === 'string' ? param : param.name;
            context.setEnvironmentKey(name, options[i]);
        }
        const r = await forgescript_1.Interpreter.run(context);
        canvasManager.current = previous;
        if (oldmatrix)
            cctx.setTransform(oldmatrix);
        return r === null ? this.stop() : this.success(r);
    }
});

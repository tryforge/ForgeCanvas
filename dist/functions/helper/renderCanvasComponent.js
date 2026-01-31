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
        if (x && y) {
            oldmatrix = cctx.getTransform();
            cctx.translate(x, y);
        }
        const { canvasManager } = ctx;
        canvasManager.current.push(canvas);
        const context = new forgescript_1.Context({
            ...ctx.cloneRuntime(),
            data: component.compiled,
            obj: {},
            doNotSend: true
        });
        context.setEnvironmentKey('options', options);
        context.canvasManager = canvasManager;
        context.imageManager = ctx.imageManager;
        context.gradientManager = ctx.gradientManager;
        context.gifManager = ctx.gifManager;
        context.lottieManager = ctx.lottieManager;
        context.neuquantManager = ctx.neuquantManager;
        await forgescript_1.Interpreter.run(context);
        canvasManager.current.pop();
        if (oldmatrix)
            cctx.setTransform(oldmatrix);
        return this.success();
    }
});

/*
* SPDX-License-Identifier: LGPL-3.0-or-later
* Copyright © 2026 BotForge
*/

import { NativeFunction, ArgType, Interpreter, Context } from '@tryforge/forgescript';
import { FCError, ForgeCanvas } from '../..';
import { DOMMatrix } from '@napi-rs/canvas';

export default new NativeFunction({
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
            type: ArgType.String,
            required: false,
            rest: false
        },
        {
            name: 'component',
            description: 'Name of the component',
            type: ArgType.String,
            required: true,
            rest: false
        },
        {
            name: 'x',
            description: 'The X coordinate',
            type: ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'y',
            description: 'The Y coordinate',
            type: ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'options',
            description: 'The options of the component',
            type: ArgType.Unknown,
            required: false,
            rest: true
        }
    ],
    async execute(ctx, [cname, name, x, y, options]) {
        const canvas = cname
            ? ctx.canvasManager?.get(cname)
            : ctx.canvasManager?.lastCurrent;
        if (!canvas) return this.customError(FCError.NoCanvas);
        const cctx = canvas.ctx;

        const component = ForgeCanvas.components.get(name);
        if (!component) return this.customError(FCError.NoComponent);

        let oldmatrix: DOMMatrix | undefined;
        if (x && y) {
            oldmatrix = cctx.getTransform();
            cctx.translate(x, y);
        }

        const { canvasManager } = ctx;

        canvasManager!.current.push(canvas);
        const context = new Context({
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

        await Interpreter.run(context);
        canvasManager!.current.pop();

        if (oldmatrix) cctx.setTransform(oldmatrix);
        return this.success();
    }
});

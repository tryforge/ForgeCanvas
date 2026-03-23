"use strict";
/*
* SPDX-License-Identifier: LGPL-3.0-or-later
* Copyright © 2026 BotForge
*/
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("../..");
exports.default = new forgescript_1.NativeFunction({
    name: '$createCanvas',
    aliases: ['$newCanvas', '$canvas'],
    description: 'Creates a new canvas',
    brackets: true,
    unwrap: false,
    args: [
        {
            name: 'name',
            description: 'The name of the canvas',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false
        },
        {
            name: 'width',
            description: 'The width of the canvas',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'height',
            description: 'The height of the canvas',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'code',
            description: 'Executes code with this canvas as current (empty name)',
            type: forgescript_1.ArgType.Unknown,
            required: false,
            rest: true
        }
    ],
    async execute(ctx) {
        const manager = ctx.canvasManager instanceof __1.CanvasManager ?
            ctx.canvasManager : ctx.canvasManager = new __1.CanvasManager();
        const options = await this['resolveMultipleArgs'](ctx, 0, 1, 2);
        const [name, w, h] = options.args;
        const r = options.return;
        if (!r?.success)
            return r;
        if (!name?.trim()?.length)
            return this.customError(__1.ForgeCanvasError.EmptyName);
        const previous = manager.current;
        manager.current = new __1.CanvasBuilder(w, h);
        const fields = this.data.fields;
        for (let i = 3; i < fields.length; i++) {
            const r = await this['resolveCode'](ctx, fields[i]);
            if (!r?.success)
                return r;
        }
        manager.set(name, manager.current);
        manager.current = previous;
        return this.success();
    }
});

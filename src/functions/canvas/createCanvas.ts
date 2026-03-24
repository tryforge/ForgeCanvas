/*
* SPDX-License-Identifier: LGPL-3.0-or-later
* Copyright © 2026 BotForge
*/

import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { CanvasManager, CanvasBuilder, ForgeCanvasError } from '../..';

export default new NativeFunction({
    name: '$createCanvas',
    aliases: ['$newCanvas', '$canvas'],
    description: 'Creates a new canvas',
    brackets: true,
    unwrap: false,
    args: [
        {
            name: 'name',
            description: 'The name of the canvas',
            type: ArgType.String,
            required: true,
            rest: false
        },
        {
            name: 'width',
            description: 'The width of the canvas',
            type: ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'height',
            description: 'The height of the canvas',
            type: ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'code',
            description: 'Executes code with this canvas as current (empty name)',
            type: ArgType.Unknown,
            required: false,
            rest: true
        }
    ],
    async execute(ctx) {
        const manager = ctx.canvasManager instanceof CanvasManager ?
            ctx.canvasManager : ctx.canvasManager = new CanvasManager();

        const options = await this['resolveMultipleArgs'](ctx, 0,1,2);
        const [name, w,h] = options.args;

        const r = options.return;
        if (!r?.success) return r;

        if (!name?.trim()?.length)
            return this.customError(ForgeCanvasError.EmptyName);

        const previous = manager.current;
        manager.current = new CanvasBuilder(w,h);

        const fields = this.data.fields!;
        for (let i = 3; i < fields.length; i++) {
            const r = await this['resolveCode'](ctx, fields[i]);
            if (!r?.success) return r;
        }

        manager.set(name, manager.current);
        manager.current = previous;

        return this.success();
    }
});
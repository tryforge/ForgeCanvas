/*
* SPDX-License-Identifier: LGPL-3.0-or-later
* Copyright © 2026 BotForge
*/

import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { Encoder } from '@gifsx/gifsx';

import { GIFManager } from '../..';

export default new NativeFunction({
    name: '$newGIFEncoder',
    aliases: ['$createGIFEncoder', '$GIFEncoder', '$createEncoder', '$newEncoder'],
    description: 'Creates a new GIF Encoder',
    version: '1.2.0',
    brackets: true,
    unwrap: false,
    args: [
        {
            name: 'gif',
            description: 'Name of the new GIF Encoder',
            type: ArgType.String,
            required: true,
            rest: false
        },
        {
            name: 'width',
            description: 'Width of the new canvas',
            type: ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'height',
            description: 'Height of the new canvas',
            type: ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'palette',
            description: 'Palette for the GIF',
            type: ArgType.Json,
            required: false,
            rest: false
        },
        {
            name: 'functions',
            description: 'Functions',
            type: ArgType.Unknown,
            required: false,
            rest: true
        }
    ],
    async execute(ctx) {
        if (!this.data.fields) this.data.fields = [];
        const manager = ctx.gifManager instanceof GIFManager ?
            ctx.gifManager : ctx.gifManager = new GIFManager();

        const options = await this['resolveMultipleArgs'](ctx, 0,1,2,3);
        let [name, width, height, palette] = options.args;

        const r = options.return;
        if (!r?.success) return r;

        try { palette = JSON.parse(palette) } catch(_){};
        
        const previous = manager.currentEncoder;
        manager.currentEncoder = new Encoder(
            width, height,
            Array.isArray(palette)
                ? Uint8Array.from(palette)
                : undefined
        );

        for (let i = 4; i < this.data.fields.length; i++) {
            const r = await this['resolveCode'](ctx, this.data.fields[i]);
            if (!r?.success) return r;
        }

        manager.setEncoder(name, manager.currentEncoder);
        manager.currentEncoder = previous;

        return this.success();
    }
});

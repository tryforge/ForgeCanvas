/*
* SPDX-License-Identifier: LGPL-3.0-or-later
* Copyright © 2026 BotForge
*/

import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { LoadImageOptions } from '@napi-rs/canvas';

import { ImageManager } from '../..';

export default new NativeFunction({
    name: '$loadImageOptions',
    aliases: [],
    description: 'Sets or returns the current load image options; Applies to $drawImage and other',
    version: '1.3.0',
    brackets: false,
    unwrap: true,
    args: [
        {
            name: 'alt',
            description: 'Sets the alt text of the next images',
            type: ArgType.String,
            required: false,
            rest: false
        },
        {
            name: 'maxRedirects',
            description: 'Sets the limit of redirects the loader allows during fetching; Unlimited if none provided',
            type: ArgType.Number,
            required: false,
            rest: false
        },
        {
            name: 'requestOptions',
            description: 'Sets the loader\'s fetch options',
            type: ArgType.Json,
            required: false,
            rest: false
        }
    ],
    async execute (ctx, [alt, max, opts]) {
        const manager = ctx.imageManager instanceof ImageManager ?
            ctx.imageManager : ctx.imageManager = new ImageManager();

        if (!alt && !max && !opts) return this.successJSON(manager.loadOptions ?? {});

        const options: LoadImageOptions = {};

        if (alt?.trim().length) options.alt = alt;
        if (typeof max === 'number')
            options.maxRedirects = max;
        if (Object.keys(opts ?? {}).length)
            options.requestOptions = opts as any;

        if (Object.keys(options).length)
            manager.loadOptions = options;
        else delete manager.loadOptions;

        return this.success();
    }
});

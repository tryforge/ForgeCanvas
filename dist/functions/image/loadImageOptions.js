"use strict";
/*
* SPDX-License-Identifier: LGPL-3.0-or-later
* Copyright © 2026 BotForge
*/
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("../..");
exports.default = new forgescript_1.NativeFunction({
    name: '$loadImageOptions',
    aliases: [],
    description: 'Sets or returns the current load image options; Applies to $drawImage and other',
    version: '1.3.0',
    brackets: false,
    unwrap: true,
    args: [
        {
            name: 'global',
            description: 'If true, touches global Image Manager instead',
            type: forgescript_1.ArgType.Boolean,
            required: false,
            rest: false
        },
        {
            name: 'alt',
            description: 'Sets the alt text of the next images',
            type: forgescript_1.ArgType.String,
            required: false,
            rest: false
        },
        {
            name: 'maxRedirects',
            description: 'Sets the limit of redirects the loader allows during fetching; Unlimited if none provided',
            type: forgescript_1.ArgType.Number,
            required: false,
            rest: false
        },
        {
            name: 'requestOptions',
            description: 'Sets the loader\'s fetch options',
            type: forgescript_1.ArgType.Json,
            required: false,
            rest: false
        }
    ],
    async execute(ctx, [g, alt, max, opts]) {
        const manager = !g ? (ctx.imageManager instanceof __1.ImageManager ?
            ctx.imageManager : ctx.imageManager = new __1.ImageManager())
            : ctx.client.preloadImages;
        if (!alt && !max && !opts)
            return this.successJSON(manager.loadOptions ?? {});
        const options = {};
        if (alt?.trim().length)
            options.alt = alt;
        if (typeof max === 'number')
            options.maxRedirects = max;
        if (Object.keys(opts ?? {}).length)
            options.requestOptions = opts;
        if (Object.keys(options).length)
            manager.loadOptions = options;
        else
            delete manager.loadOptions;
        return this.success();
    }
});

/*
* SPDX-License-Identifier: LGPL-3.0-or-later
* Copyright © 2026 BotForge
*/

import { NativeFunction, ArgType, Return } from '@tryforge/forgescript';
import { ImageManager, resolveImage } from '../..';

export default new NativeFunction({
    name: '$loadImage',
    aliases: ['$createImage', '$newImage'],
    description: 'Loads an image from an URL, File path, SVG, or other data',
    version: '1.1.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'name',
            description: 'The image name',
            type: ArgType.String,
            required: true,
            rest: false
        },
        {
            name: 'src',
            description: 'The image source',
            type: ArgType.String,
            required: true,
            rest: false
        }
    ],
    async execute (ctx, [name, src]) {
        if (!(ctx.imageManager instanceof ImageManager))
            ctx.imageManager = new ImageManager();

        const img = await resolveImage(this, ctx, src);
        if (img instanceof Return) return img;

        ctx.imageManager.map.set(name, img);
        return this.success();
    }
});

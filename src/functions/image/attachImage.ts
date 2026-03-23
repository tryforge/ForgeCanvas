/*
* SPDX-License-Identifier: LGPL-3.0-or-later
* Copyright © 2026 BotForge
*/

import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { AttachmentBuilder } from 'discord.js';

import { ForgeCanvasError } from '../..';

export default new NativeFunction({
    name: '$attachImage',
    aliases: ['$sendImage', '$renderImage', '$imageRender'],
    description: 'Attaches the image',
    version: '1.2.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'image',
            description: 'Name of the image',
            type: ArgType.String,
            required: true,
            rest: false
        },
        {
            name: 'filename',
            description: 'The name with the extension of the image to be attached as',
            type: ArgType.String,
            required: false,
            rest: false
        }
    ],
    async execute (ctx, [name, filename]) {
        let manager = ctx.imageManager;
        if (name.startsWith('preload://')) {
            name = name.slice(10);
            manager = ctx.client.preloadImages;
        }
        
        const img = manager?.get(name)?.src;
        if (!img || typeof img === 'string') return this.customError(ForgeCanvasError.NoImage);
        
        ctx.container.files.push(new AttachmentBuilder(
            Buffer.from(img), { name: filename ?? `${name}.png` }
        ));
        return this.success();
    }
});
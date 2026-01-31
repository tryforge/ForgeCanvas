/*
* SPDX-License-Identifier: LGPL-3.0-or-later
* Copyright © 2026 BotForge
*/

import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { Image, loadImage } from '@napi-rs/canvas';
import { FCError } from '../../classes';

export default new NativeFunction({
    name: '$imageBuffer',
    description: 'Stores the image\'s buffer.',
    version: '1.2.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'variable name',
            description: 'The variable to load it to, accessed with $env[name]',
            type: ArgType.String,
            required: true,
            rest: false,
            version: '1.3.0'
        },
        {
            name: 'path',
            description: 'The image path.',
            type: ArgType.String,
            required: true,
            rest: false
        }
    ],
    async execute (ctx, [vname, path]) {
        let image: Image | undefined

        if (path.startsWith('images://')) {
            path = path.slice(9);

            let manager = ctx.imageManager;
            if (path.startsWith('preload://')) {
                path = path.slice(10);
                manager = ctx.client.preloadImages;
            }

            image = manager?.get(path);
        } else image = await loadImage(path);
        if (!image) return this.customError(FCError.NoImage);

        ctx.setEnvironmentKey(vname, await image.getBuffer());
        return this.success();
    }
});

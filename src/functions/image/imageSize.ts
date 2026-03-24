/*
* SPDX-License-Identifier: LGPL-3.0-or-later
* Copyright © 2026 BotForge
*/

import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { Image } from '@napi-rs/canvas';

import { ForgeCanvasError, WidthOrHeight } from '../..';

export default new NativeFunction({
    name: '$imageSize',
    aliases: ['$imgSize', '$imageDimensions'],
    description: 'Returns the image\'s size',
    version: '1.1.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'path',
            description: 'The image path or name (via images://name or, preload://name, if global)',
            type: ArgType.String,
            required: true,
            rest: false
        },
        {
            name: 'property',
            description: 'Whether to return the image\'s width or height; Returns both as JSON if empty',
            type: ArgType.Enum,
            enum: WidthOrHeight,
            required: false,
            rest: false
        }
    ],
    async execute (ctx, [path, property]) {
        let image: Image | undefined;

        if (path.startsWith('images://')) {
            path = path.slice(9);

            let manager = ctx.imageManager;
            if (path.startsWith('preload://')) {
                path = path.slice(10);
                manager = ctx.client.preloadImages;
            }

            image = manager?.get(path);
        } else if (path.startsWith('preload://'))
            image = ctx.client.preloadImages.get(path);
        else image = await ctx.imageManager?.load(path);
        if (!image) return this.customError(ForgeCanvasError.ImageFail);

        return this.success(property !== null && property !== undefined // @ts-ignore
            ? image[WidthOrHeight[
                (typeof property === 'string' ? WidthOrHeight[property] : property) as any
            ]]
            : JSON.stringify({ width: image.width, height: image.height })
        );
    }
});

/*
* SPDX-License-Identifier: LGPL-3.0-or-later
* Copyright © 2026 BotForge
*/

import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { AttachmentBuilder } from 'discord.js';

import { ForgeCanvasError, ImageFormat } from '../..';

export default new NativeFunction({
    name: '$attachCanvas',
    aliases: ['$sendCanvas', '$renderCanvas', '$canvasRender'],
    description: 'Creates a new canvas',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'canvas',
            description: 'Name of the canvas',
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
        },
        {
            name: 'format',
            description: 'The image format',
            type: ArgType.Enum,
            enum: ImageFormat,
            required: false,
            rest: false
        }
    ],
    async execute(ctx, [name, file, format]) {
        const canvas = ctx.canvasManager?.get(name)?.inner;
        if (!canvas) return this.customError(ForgeCanvasError.NoCanvas);

        ctx.container.files.push(new AttachmentBuilder( // @ts-ignore
            await canvas.encode((typeof format === 'number' ? ImageFormat[format] : format) ?? 'png'),
            { name: file ?? `${name}.png` }
        ));
        return this.success();
    }
});
/*
* SPDX-License-Identifier: LGPL-3.0-or-later
* Copyright © 2026 BotForge
*/

import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { writeFileSync } from 'node:fs';
import { ForgeCanvasError } from '../..';

export default new NativeFunction({
    name: '$saveEncoder',
    aliases: [
        '$downloadEncoder',
        '$downloadGIF',
        '$saveGIF',
        '$encoderSave',
        '$encoderDownload',
        '$gifDownload',
        '$gifSave'
    ],
    description: 'Saves an Encoder GIF to a file',
    version: '1.1.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'gif',
            description: 'Name of the Encoder',
            type: ArgType.String,
            required: false,
            rest: false
        },
        {
            name: 'path',
            description: 'Path to a directory (including the canvas file name)',
            type: ArgType.String,
            required: true,
            rest: false
        }
    ],
    execute (ctx, [name, path]) {
        const gif = ctx.gifManager?.getEncoderOrCurrent(name);

        if (!gif) return this.customError(ForgeCanvasError.NoEncoder);
        if (!path) return this.customError(ForgeCanvasError.NoPath);

        writeFileSync(path, gif.getBuffer());
        return this.success();
    }
});
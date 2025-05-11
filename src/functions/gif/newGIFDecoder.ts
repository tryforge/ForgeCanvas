import { ArgType, NativeFunction } from '@tryforge/forgescript';
import { Decoder } from '@gifsx/gifsx';
import { fetch } from 'undici';
import { readFile } from 'node:fs/promises';
import { FCError, GIFManager } from '../..';

export default new NativeFunction({
    name: '$newGIFDecoder',
    aliases: ['$createGIFDecoder', '$createDecoder', '$GIFDecoder', '$newDecoder'],
    description: 'Creates a new GIF Decoder.',
    version: '1.2.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'gif',
            description: 'Name of the new GIF Decoder.',
            type: ArgType.String,
            required: true,
            rest: false
        },
        {
            name: 'path',
            description: 'Path to the GIF file.',
            type: ArgType.String,
            required: true,
            rest: false
        },
        {
            name: 'options',
            description: 'Options for the GIF Decoder.',
            type: ArgType.String,
            required: false,
            rest: false
        }
    ],
    async execute (ctx, [name, path, options]) {
        if (!ctx.gifManager || !(ctx.gifManager instanceof GIFManager))
            ctx.gifManager = new GIFManager();

        let gif: ArrayBuffer | Uint8ClampedArray | undefined;
        if (path.startsWith('http://') || path.startsWith('https://')) {
            const response = await fetch(path);
            if (!response.ok) return this.customError(`Failed to fetch ${path}`);

            gif = await response.arrayBuffer();
        } else if (path.startsWith('encoder://')) {
            const encoder = ctx.gifManager.getEncoder(path.slice(10));
            if (!encoder) return this.customError(FCError.NoEncoder);

            gif = encoder.getBuffer();
        } else gif = await readFile(path, null);

        ctx.gifManager.setDecoder(
            name,
            new Decoder(
                Buffer.from(gif),
                options ? ctx.gifManager.getDecodeOptions(options) : undefined
            )
        );
        return this.success();
    }
});
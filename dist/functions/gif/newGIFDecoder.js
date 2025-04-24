"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const gifsx_1 = require("@gifsx/gifsx");
const undici_1 = require("undici");
const promises_1 = require("node:fs/promises");
const __1 = require("../..");
exports.default = new forgescript_1.NativeFunction({
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
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false
        },
        {
            name: 'path',
            description: 'Path to the GIF file.',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false
        },
        {
            name: 'options',
            description: 'Options for the GIF Decoder.',
            type: forgescript_1.ArgType.String,
            required: false,
            rest: false
        }
    ],
    async execute(ctx, [name, path, options]) {
        if (!ctx.gifManager || !(ctx.gifManager instanceof __1.GIFManager))
            ctx.gifManager = new __1.GIFManager();
        let gif;
        if (path.startsWith('http://') || path.startsWith('https://')) {
            const response = await (0, undici_1.fetch)(path);
            if (!response.ok)
                return this.customError(`Failed to fetch ${path}`);
            gif = await response.arrayBuffer();
        }
        else if (path.startsWith('encoder://')) {
            const encoder = ctx.gifManager.getEncoder(path.slice(10));
            if (!encoder)
                return this.customError('No encoder');
            gif = encoder.getBuffer();
        }
        else
            gif = await (0, promises_1.readFile)(path, null);
        ctx.gifManager.setDecoder(name, new gifsx_1.Decoder(Buffer.from(gif), options ? ctx.gifManager.getDecodeOptions(options) : undefined));
        return this.success();
    }
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const node_fs_1 = require("node:fs");
exports.default = new forgescript_1.NativeFunction({
    name: '$saveEncoder',
    aliases: ['$downloadEncoder', '$downloadGIF', '$saveGIF', '$encoderSave', '$encoderDownload', '$gifDownload', '$gifSave'],
    description: 'Saves an Encoder GIF to a file.',
    version: '1.1.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'gif',
            description: 'Name of the Encoder.',
            type: forgescript_1.ArgType.String,
            required: false,
            rest: false
        },
        {
            name: 'path',
            description: 'Path to a directory. (including the canvas file name)',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false
        }
    ],
    async execute(ctx, [name, path]) {
        const gif = name
            ? ctx.gifManager?.getEncoder(name)
            : ctx.gifManager?.lastCurrentEncoder;
        if (!gif)
            return this.customError('No gif');
        if (!path)
            return this.customError('No path provided');
        (0, node_fs_1.writeFileSync)(path, gif.getBuffer());
        return this.success();
    }
});

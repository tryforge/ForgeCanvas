"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const discord_js_1 = require("discord.js");
exports.default = new forgescript_1.NativeFunction({
    name: '$attachGIF',
    aliases: ['$sendGIF', '$renderGIF', '$gifRender'],
    description: 'Attaches the GIF.',
    version: '1.2.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'gif',
            description: 'Name of the GIF.',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false
        },
        {
            name: 'filename',
            description: 'The name of the GIF to be attached as.',
            type: forgescript_1.ArgType.String,
            required: false,
            rest: false
        }
    ],
    async execute(ctx, [name, filename]) {
        const gif = ctx.gifManager?.getEncoder(name);
        filename = `${filename ?? name}.gif`;
        if (!gif)
            return this.customError('No GIF');
        ctx.container.files.push(new discord_js_1.AttachmentBuilder(Buffer.from(gif.getBuffer()), {
            name: filename
        }));
        return this.success();
    }
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const discord_js_1 = require("discord.js");
exports.default = new forgescript_1.NativeFunction({
    name: '$attachImage',
    aliases: ['$sendImage', '$renderImage', '$imageRender'],
    description: 'Attaches the image.',
    version: '1.2.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'image',
            description: 'Name of the image.',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false
        },
        {
            name: 'filename',
            description: 'The name with the extension of the image to be attached as.',
            type: forgescript_1.ArgType.String,
            required: false,
            rest: false
        }
    ],
    async execute(ctx, [name, filename]) {
        const img = await ctx.imageManager?.get(name)?.getBuffer();
        if (!img)
            return this.customError('No image');
        ctx.container.files.push(new discord_js_1.AttachmentBuilder(img, {
            name: filename ?? `${name}.png`
        }));
        return this.success();
    }
});

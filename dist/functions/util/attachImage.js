"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const discord_js_1 = require("discord.js");
const canvas_1 = require("@napi-rs/canvas");
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
        const img = ctx.imageManager?.get(name);
        if (!img)
            return this.customError('No image');
        const canvas = (0, canvas_1.createCanvas)(img.width, img.height);
        const cntx = canvas.getContext('2d');
        cntx.drawImage(img, 0, 0);
        ctx.container.files.push(new discord_js_1.AttachmentBuilder(canvas.toBuffer('image/png'), {
            name: filename ?? `${name}.png`
        }));
        return this.success();
    }
});
//# sourceMappingURL=attachImage.js.map
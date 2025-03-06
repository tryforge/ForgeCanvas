import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { createCanvas } from '@napi-rs/canvas';
import { AttachmentBuilder } from 'discord.js';
import { Context } from '../../';

export default new NativeFunction({
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
            type: ArgType.String,
            required: true,
            rest: false
        },
        {
            name: 'filename',
            description: 'The name with the extension of the image to be attached as.',
            type: ArgType.String,
            required: false,
            rest: false
        }
    ],
    async execute (ctx: Context, [name, filename]) {
        const img = ctx.imageManager?.get(name);
        if (!img) return this.customError('No image');

        const canvas = createCanvas(img.width, img.height)
        const cntx = canvas.getContext('2d');
        
        cntx.drawImage(img, 0, 0);
        ctx.container.files.push(new AttachmentBuilder(canvas.toBuffer('image/png'), {
            name: filename ?? `${name}.png`
        }));
        return this.success();
    }
});
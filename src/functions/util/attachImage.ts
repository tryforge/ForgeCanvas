import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { AttachmentBuilder } from 'discord.js';
import { FCError } from '../../classes';

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
    async execute (ctx, [name, filename]) {
        let manager = ctx.imageManager;
        if (name.startsWith('preload://')) {
            name = name.slice(10);
            manager = ctx.client.preloadImages;
        }
        
        const img = await manager?.get(name)?.getBuffer();
        if (!img) return this.customError(FCError.NoImage);
        
        ctx.container.files.push(new AttachmentBuilder(
            img, { name: filename ?? `${name}.png` }
        ));
        return this.success();
    }
});
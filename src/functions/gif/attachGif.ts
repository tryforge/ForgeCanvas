import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { AttachmentBuilder } from 'discord.js';

export default new NativeFunction({
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
            type: ArgType.String,
            required: true,
            rest: false
        },
        {
            name: 'filename',
            description: 'The name of the GIF to be attached as.',
            type: ArgType.String,
            required: false,
            rest: false
        }
    ],
    async execute (ctx, [name, filename]) {
        const gif = ctx.gifManager?.getEncoder(name);
        filename = `${filename ?? name}.gif`;
        
        if (!gif) return this.customError('No GIF');

        ctx.container.files.push(new AttachmentBuilder(Buffer.from(gif.getBuffer()), {
            name: filename
        }));
        return this.success();
    }
});
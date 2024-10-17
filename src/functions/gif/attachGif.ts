import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { AttachmentBuilder } from 'discord.js';
import { GIFManager, Context } from '../..';

export default new NativeFunction({
    name: '$attachGIF',
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
            description: 'The GIF attachment file name.',
            type: ArgType.String,
            required: false,
            rest: false
        }
    ],
    async execute(ctx: Context, [gifName, filename]) {
        const gif = ctx.gifManager?.get(gifName);

        if (!gif) {
            return this.customError('No GIF with the provided name found.');
        }

        ctx.container.files.push(new AttachmentBuilder(gif.out.getData(), {
            name: filename ? filename.replace(/\{gif\}/g, gifName) : `${gifName}.gif`
        }));

        return this.success();
    }
});

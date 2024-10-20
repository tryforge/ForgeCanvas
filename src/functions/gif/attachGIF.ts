import { ArgType, NativeFunction } from '@tryforge/forgescript';
import { Context } from '../..';
import { AttachmentBuilder } from 'discord.js';

export default new NativeFunction({
    name: '$attachGIF',
    aliases: ['$sendGIF', '$renderGIF', '$gifRender'],
    description: 'Attaches the gif.',
    version: '1.1.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'gif',
            description: 'Name of the gif.',
            type: ArgType.String,
            required: true,
            rest: false
        },
        {
            name: 'filename',
            description: 'The name of the gif to be attached as.',
            type: ArgType.String,
            required: false,
            rest: false
        }
    ],
    async execute (ctx: Context, [name, filename]) {
        const gif = ctx.gifManager?.get(name);
        
        if (!gif)
            return this.customError('No gif.');

        ctx.container.files.push(new AttachmentBuilder(Buffer.from([...gif.out.getData(), 0x3b]), {
            name: `${filename ?? name}.gif`
        }));

        return this.success();
    }
});
import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { AttachmentBuilder } from 'discord.js';
import { Context } from '../../';

export default new NativeFunction({
    name: '$attachCanvas',
    description: 'Attaches the canvas.',
    version: '1.0.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'name',
            description: 'Name of the canvas.',
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
        const canvas = ctx.canvasManager?.get(name);
        
        if (!canvas)
            return this.customError('No canvas');

        ctx.container.files.push(new AttachmentBuilder(canvas.buffer, {
            name: filename ?? `${name}.png`
        }));
        return this.success();
    }
});
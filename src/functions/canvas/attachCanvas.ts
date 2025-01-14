import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { AttachmentBuilder } from 'discord.js';
import { Context, ImageFormat } from '../../';

export default new NativeFunction({
    name: '$attachCanvas',
    aliases: ['$sendCanvas', '$renderCanvas', '$canvasRender'],
    description: 'Attaches the canvas.',
    version: '1.0.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'canvas',
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
        },
        {
            name: 'format',
            description: 'The image format.',
            type: ArgType.Enum,
            enum: ImageFormat,
            required: false,
            rest: false
        }
    ],
    async execute (ctx: Context, [name, filename, f]) {
        const canvas = ctx.canvasManager?.get(name)?.ctx?.canvas;
        if (!canvas) return this.customError('No canvas');

        ctx.container.files.push(new AttachmentBuilder(canvas.toBuffer((f !== null 
            ? 'image/' + (typeof f === 'number' ? ImageFormat[f] : f)
        : 'image/png') as any), {
            name: filename ?? `${name}.png`
        }));
        return this.success();
    }
});
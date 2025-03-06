import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { loadImage } from '@napi-rs/canvas';
import { writeFileSync } from 'node:fs';
import { Context, ImageManager, ImageFormat } from '../..';

export default new NativeFunction({
    name: '$saveCanvas',
    aliases: ['$downloadCanvas', '$canvasSave', '$canvasDownload'],
    description: 'Saves a canvas to a file.',
    version: '1.1.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'canvas',
            description: 'Name of the canvas.',
            type: ArgType.String,
            required: false,
            rest: false
        },
        {
            name: 'path',
            description: 'Path to a directory. (including the canvas file name and extension)',
            type: ArgType.String,
            required: true,
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
    async execute (ctx: Context, [name, path, f]) {
        const canvas = name
            ? ctx.canvasManager?.get(name)
            : ctx.canvasManager?.lastCurrent;
        if (!canvas) return this.customError('No canvas');

        const format = (f !== null 
            ? 'image/' + (typeof f === 'number' ? ImageFormat[f] : f)
        : 'image/png') as any;

        if (!path) return this.customError('No path provided');

        if (path.startsWith('images://')) {
            if (!ctx.imageManager) ctx.imageManager = new ImageManager();
            ctx.imageManager.set(path.slice(9), await loadImage(canvas.buffer(format)));
        } else writeFileSync(path, canvas.buffer(format));
        return this.success();
    }
});
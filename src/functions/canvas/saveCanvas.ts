import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { Context, ImageManager, ImageFormat } from '../..';
import { writeFileSync } from 'node:fs';
import { loadImage } from '@napi-rs/canvas';

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
        const canvas = (name
            ? ctx.canvasManager?.get(name)
                : !name && ctx.canvasManager?.current?.length !== 0 
                    ? ctx.canvasManager?.current?.[ctx.canvasManager?.current?.length - 1] : null)?.ctx?.canvas;
        const format = (f !== null 
            ? 'image/' + (typeof f === 'number' ? ImageFormat[f] : f)
        : 'image/png') as any;

        if (!canvas) return this.customError('No canvas');
        if (!path) return this.customError('No path provided');

        if (path.startsWith('images://')) {
            if (!ctx.imageManager) ctx.imageManager = new ImageManager();
            ctx.imageManager.set(path.slice(9), await loadImage(canvas.toBuffer(format)));
        } else writeFileSync(path, canvas.toBuffer(format));
        return this.success();
    }
});
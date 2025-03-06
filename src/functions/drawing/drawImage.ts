import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { createCanvas, Image } from '@napi-rs/canvas';
import { indexedToRgba } from '@gifsx/gifsx';
import { Context } from '../..';


export default new NativeFunction({
    name: '$drawImage',
    aliases: ['$placeImage'],
    description: 'Draws an image on a canvas.',
    version: '1.0.0',
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
            description: 'The image path.',
            type: ArgType.String,
            required: true,
            rest: false
        },
        {
            name: 'x',
            description: 'The image start X coordinate.',
            type: ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'y',
            description: 'The image start Y coordinate.',
            type: ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'width',
            description: 'The image width.',
            type: ArgType.Number,
            required: false,
            rest: false
        },
        {
            name: 'height',
            description: 'The image height.',
            type: ArgType.Number,
            required: false,
            rest: false
        },
        {
            name: 'radius',
            description: 'The image radius.',
            type: ArgType.Number,
            required: false,
            rest: true
        }
    ],
    async execute (ctx: Context, [name, path, x, y, w, h, r]) {
        const canvas = name
            ? ctx.canvasManager?.get(name)
            : ctx.canvasManager?.lastCurrent;
        if (!canvas) return this.customError('No canvas');

        let img: string | Image | undefined | Buffer = path;
        if (path.startsWith('frame://')) {
            const frame = ctx.gifManager?.getFrame(path.slice(8));
            if (!frame) return this.customError('No frame');
            const { width, height, buffer } = frame;

            const canvas = createCanvas(width, height);
            const context = canvas.getContext('2d');
            const imageData = context.createImageData(width, height);

            imageData.data.set(buffer.length === width * height * 4
                ? buffer : indexedToRgba(
                Uint8Array.from(buffer), frame.palette ?? Uint8Array.from([]),
                frame.transparent
            ));
            context.putImageData(imageData, 0, 0);
            
            img = canvas.toBuffer('image/png');
        } else if (path.startsWith('images://') && ctx.imageManager)
            img = ctx.imageManager.get(path.slice(9));
        else if (path.startsWith('canvas://'))
            img = ctx.canvasManager?.get(path.slice(9))?.buffer('image/png');

        if (!img) return this.customError('Failed to load an image.');

        await canvas.drawImage(img, x, y, w, h, r.length === 1 ? r[0] : r);
        return this.success();
    }
});
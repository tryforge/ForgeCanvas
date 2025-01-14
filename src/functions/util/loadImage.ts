import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { ImageManager, Context, CanvasUtil, parseArgs } from '../..';
import { createCanvas, loadImage } from '@napi-rs/canvas';

export default new NativeFunction({
    name: '$loadImage',
    aliases: ['$createImage', '$newImage'],
    description: 'Loads an image.',
    version: '1.1.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'name',
            description: 'The image name.',
            type: ArgType.String,
            required: true,
            rest: false
        },
        {
            name: 'src',
            description: 'The image source.',
            type: ArgType.String,
            required: true,
            rest: false
        }
    ],
    async execute (ctx: Context, [name, src]) {
        if (!ctx.imageManager || !(ctx.imageManager instanceof ImageManager))
            ctx.imageManager = new ImageManager();

        let source;
        if (['rgba://', 'rgb://', 'hex://'].find(x => src.startsWith(x))) {
            const [size, data] = parseArgs(src, src.split('//')[0].length + 2, 2);
            const [width, height] = size.split('x').map(Number);
            
            const canvas = createCanvas(width, height);
            const context = canvas.getContext('2d');
            const imageData = context.createImageData(width, height);

            imageData.data.set(new Uint8ClampedArray(
                src.startsWith('hex://')
                    ? data.split(',').flatMap(hex => {
                        const rgba = CanvasUtil.hexToRgba(hex.trim());
                        return [rgba.red, rgba.green, rgba.blue, rgba.alpha ?? 255];
                    })
                : src.startsWith('rgb://')
                    ? data.split(',').map(Number).flatMap((v, i) => {
                        if ((i + 1) % 3 === 0)
                            return [v, 255];
                        return [v];
                    })
                : data.split(',').map(Number)
            ));

            context.putImageData(imageData, 0, 0);
            source = canvas.toBuffer('image/png');
        } else if (src.startsWith('canvas://')) {
            const canvas = ctx.canvasManager?.get(src.slice(9));
            if (!canvas) return this.customError('Invalid canvas');
            source = canvas.buffer;
        } else if (src.startsWith('frame://')) {
            const frame = ctx.gifManager?.getFrame(src.slice(8));
            if (!frame) return this.customError('No frame');
            const { width, height, buffer } = frame;

            const canvas = createCanvas(width, height);
            const context = canvas.getContext('2d');
            const imageData = context.createImageData(width, height);

            imageData.data.set(buffer);
            context.putImageData(imageData, 0, 0);
            
            source = canvas.toBuffer('image/png');
        } else source = src;

        if (!source) return this.customError('Invalid source');

        ctx.imageManager.set(name, await loadImage(source));
        return this.success();
    }
});
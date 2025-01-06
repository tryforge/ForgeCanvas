import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { Context } from '../..';
import { DisposalMethod, Frame } from '@gifsx/gifsx';
import { loadImage as ldImage, Image, createCanvas } from '@napi-rs/canvas';

export default new NativeFunction({
    name: '$addFrame',
    description: 'Adds a frame to the GIF.',
    version: '1.2.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'gif',
            description: 'Name of the GIF.',
            type: ArgType.String,
            required: false,
            rest: false
        },
        {
            name: 'frame',
            description: 'Frame.',
            type: ArgType.String,
            required: true,
            rest: false
        },
        {
            name: 'options',
            description: 'Options.',
            type: ArgType.Json,
            required: false,
            rest: false
        }
    ],
    async execute (ctx: Context, [name, frame, options]) {
        const gif = name
            ? ctx.gifManager?.getEncoder(name)
                : !name && ctx.gifManager?.currentEncoder?.length !== 0 
                    ? ctx.gifManager?.currentEncoder?.[ctx.gifManager?.currentEncoder?.length - 1] : null;
        
        if (!gif) return this.customError('No gif');

        let f: Frame | null = null;

        if (frame.startsWith('rgba://')) {
            const [size, data] = parseArgs(frame, 'rgba://', 2);
            const [width, height] = size.split('x').map(Number);
            f = Frame.fromRgba(width, height, data.split(',').map(Number));
        } else if (frame.startsWith('rgb://')) {
            const [size, data] = parseArgs(frame, 'rgb://', 2);
            const [width, height] = size.split('x').map(Number);
            f = Frame.fromRgb(width, height, data.split(',').map(Number));
        } else if (frame.startsWith('indexed://')) {
            const [size, data] = parseArgs(frame, 'indexed://', 2);
            const [width, height] = size.split('x').map(Number);
            f = Frame.fromIndexedPixels(width, height, data.split(',').map(Number));
        } else if (['http', 'https'].some(x => frame.startsWith(`${x}://`))) {
            f = await loadImage(frame);
        } else if (frame.startsWith('path://')) {
            f = await loadImage(frame.slice(7));
        } else if (frame.startsWith('images://')) {
            const img = ctx.imageManager?.get(frame.slice(9));
            if (!img) return this.customError('No image');
            f = await loadImage(img);
        } else {
            const canvas = ctx.canvasManager?.get(frame);
            if (!canvas) return this.customError('No canvas');
            f = Frame.fromRgba(
                canvas.width, canvas.height,
                canvas.ctx.getImageData(0, 0, canvas.width, canvas.height).data
            );
        }

        if (!f) return this.customError('Invalid frame');

        if (options) {
            if (typeof options.delay === 'number') f.delay = options.delay;

            // @ts-ignore
            if (options.dispose && DisposalMethod[options.dispose])
                f.dispose = options.dispose as DisposalMethod;

            if (typeof options.transparent === 'number')
                f.transparent = options.transparent;

            if (typeof options.needsUserInput === 'boolean')
                f.needsUserInput = options.needsUserInput;

            if (typeof options.top === 'number') f.top = options.top;
            if (typeof options.left === 'number') f.left = options.left;

            if (typeof options.interlaced === 'boolean') f.interlaced = options.interlaced;

            if (Array.isArray(options.palette)) f.setPalette(options.palette);
        }

        gif.addFrame(f);
        return this.success();
    }
});

async function loadImage(
    src: string | URL | Buffer | ArrayBufferLike | Uint8Array | Image | import("stream").Readable
) {
    const img = await ldImage(src);
    const canvas = createCanvas(img.width, img.height);
    const ctx = canvas.getContext('2d');

    ctx.drawImage(img, 0, 0);
    return Frame.fromRgba(
        canvas.width, canvas.height,
        ctx.getImageData(
            0, 0,
            canvas.width,
            canvas.height
        ).data
    );
}

function parseArgs(str: string, prefix: string, length: number) {
    const args = str.slice(prefix.length).split(':');
    if (args.length !== length)
        throw new Error(`${prefix} frame expects ${length} arguments.`);

    return args;
}
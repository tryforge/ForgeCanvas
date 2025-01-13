import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { CanvasUtil, Context } from '../..';
import { DisposalMethod, Frame } from '@gifsx/gifsx';
import { loadImage, Image, createCanvas } from '@napi-rs/canvas';

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
            description: 'Frame source.',
            type: ArgType.String,
            required: true,
            rest: false
        },
        {
            name: 'options',
            description: 'Frame options.',
            type: ArgType.Json,
            required: false,
            rest: false
        },
        {
            name: 'speed',
            description: 'Frame rgb quantization speed.',
            type: ArgType.Number,
            check: (x: number) => x >= 1 && x <= 30,
            required: false,
            rest: false
        }
    ],
    async execute (ctx: Context, [name, frame, options, speed]) {
        const gif = name
            ? ctx.gifManager?.getEncoder(name)
                : !name && ctx.gifManager?.currentEncoder?.length !== 0 
                    ? ctx.gifManager?.currentEncoder?.[ctx.gifManager?.currentEncoder?.length - 1] : null;
        if (!gif) return this.customError('No gif');

        let f: Frame | undefined;
        if (frame.startsWith('rgba://')) {
            const [size, data] = parseArgs(frame, 'rgba://', 2);
            const [width, height] = size.split('x').map(Number);
            f = Frame.fromRgba(width, height, data.split(',').map(Number), speed);
        } else if (frame.startsWith('hex://')) {
            const [size, data] = parseArgs(frame, 'hex://', 2);
            const [width, height] = size.split('x').map(Number);
            f = Frame.fromRgba(width, height, data.split(',').flatMap(hex => {
                const rgba = CanvasUtil.hexToRgba(hex.trim());
                return [rgba.red, rgba.green, rgba.blue, rgba.alpha ?? 255];
            }), speed);
        } else if (frame.startsWith('rgb://')) {
            const [size, data] = parseArgs(frame, 'rgb://', 2);
            const [width, height] = size.split('x').map(Number);
            f = Frame.fromRgb(width, height, data.split(',').map(Number), speed);
        } else if (frame.startsWith('indexed://')) {
            const [size, data] = parseArgs(frame, 'indexed://', 2);
            const [width, height] = size.split('x').map(Number);
            f = Frame.fromIndexedPixels(width, height, data.split(',').map(Number));
        } else if (frame.startsWith('images://')) {
            const img = ctx.imageManager?.get(frame.slice(9));
            if (!img) return this.customError('No image');
            f = await loadFrame(img, speed);
        } else if (frame.startsWith('frame://')) {
            const fr = ctx.gifManager?.getFrame(frame.slice(8));
            if (!fr) return this.customError('No frame');
            f = fr;
        } else if (frame.startsWith('canvas://')) {
            const canvas = ctx.canvasManager?.get(frame.slice(9));
            if (!canvas) return this.customError('No canvas');
            f = Frame.fromRgba(
                canvas.width, canvas.height,
                canvas.ctx.getImageData(0, 0, canvas.width, canvas.height).data,
                speed
            );
        } else f = await loadFrame(frame);

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

async function loadFrame(
    src: string | URL | Buffer | ArrayBufferLike | Uint8Array | Image | import("stream").Readable,
    speed?: number | null
) {
    const img = await loadImage(src);
    const canvas = createCanvas(img.width, img.height);
    const ctx = canvas.getContext('2d');

    ctx.drawImage(img, 0, 0);
    return Frame.fromRgba(
        canvas.width, canvas.height,
        ctx.getImageData(
            0, 0,
            canvas.width,
            canvas.height
        ).data,
        speed
    );
};

function parseArgs(str: string, prefix: string, length: number) {
    const args = str.slice(prefix.length).split(':');
    if (args.length !== length)
        throw new Error(`${prefix} frame expects ${length} arguments.`);

    return args;
};
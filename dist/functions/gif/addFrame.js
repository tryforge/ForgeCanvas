"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("../..");
const gifsx_1 = require("@gifsx/gifsx");
const canvas_1 = require("@napi-rs/canvas");
exports.default = new forgescript_1.NativeFunction({
    name: '$addFrame',
    description: 'Adds a frame to the GIF.',
    version: '1.2.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'gif',
            description: 'Name of the GIF.',
            type: forgescript_1.ArgType.String,
            required: false,
            rest: false
        },
        {
            name: 'frame',
            description: 'Frame source.',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false
        },
        {
            name: 'options',
            description: 'Frame options.',
            type: forgescript_1.ArgType.Json,
            required: false,
            rest: false
        },
        {
            name: 'speed',
            description: 'Frame rgb quantization speed.',
            type: forgescript_1.ArgType.Number,
            check: (x) => x >= 1 && x <= 30,
            required: false,
            rest: false
        }
    ],
    async execute(ctx, [name, frame, options, speed]) {
        const gif = name
            ? ctx.gifManager?.getEncoder(name)
            : !name && ctx.gifManager?.currentEncoder?.length !== 0
                ? ctx.gifManager?.currentEncoder?.[ctx.gifManager?.currentEncoder?.length - 1] : null;
        if (!gif)
            return this.customError('No gif');
        let f;
        if (frame.startsWith('rgba://')) {
            const [size, data] = parseArgs(frame, 'rgba://', 2);
            const [width, height] = size.split('x').map(Number);
            f = gifsx_1.Frame.fromRgba(width, height, data.split(',').map(Number), speed);
        }
        else if (frame.startsWith('hex://')) {
            const [size, data] = parseArgs(frame, 'hex://', 2);
            const [width, height] = size.split('x').map(Number);
            f = gifsx_1.Frame.fromRgba(width, height, data.split(',').flatMap(hex => {
                const rgba = __1.CanvasUtil.hexToRgba(hex.trim());
                return [rgba.red, rgba.green, rgba.blue, rgba.alpha ?? 255];
            }), speed);
        }
        else if (frame.startsWith('rgb://')) {
            const [size, data] = parseArgs(frame, 'rgb://', 2);
            const [width, height] = size.split('x').map(Number);
            f = gifsx_1.Frame.fromRgb(width, height, data.split(',').map(Number), speed);
        }
        else if (frame.startsWith('indexed://')) {
            const [size, data] = parseArgs(frame, 'indexed://', 2);
            const [width, height] = size.split('x').map(Number);
            f = gifsx_1.Frame.fromIndexedPixels(width, height, data.split(',').map(Number));
        }
        else if (frame.startsWith('images://')) {
            const img = ctx.imageManager?.get(frame.slice(9));
            if (!img)
                return this.customError('No image');
            f = await loadFrame(img, speed);
        }
        else if (frame.startsWith('frame://')) {
            const fr = ctx.gifManager?.getFrame(frame.slice(8));
            if (!fr)
                return this.customError('No frame');
            f = fr;
        }
        else if (frame.startsWith('canvas://')) {
            const canvas = ctx.canvasManager?.get(frame.slice(9));
            if (!canvas)
                return this.customError('No canvas');
            f = gifsx_1.Frame.fromRgba(canvas.width, canvas.height, canvas.ctx.getImageData(0, 0, canvas.width, canvas.height).data, speed);
        }
        else
            f = await loadFrame(frame);
        if (!f)
            return this.customError('Invalid frame');
        if (options) {
            if (typeof options.delay === 'number')
                f.delay = options.delay;
            // @ts-ignore
            if (options.dispose && gifsx_1.DisposalMethod[options.dispose])
                f.dispose = options.dispose;
            if (typeof options.transparent === 'number')
                f.transparent = options.transparent;
            if (typeof options.needsUserInput === 'boolean')
                f.needsUserInput = options.needsUserInput;
            if (typeof options.top === 'number')
                f.top = options.top;
            if (typeof options.left === 'number')
                f.left = options.left;
            if (typeof options.interlaced === 'boolean')
                f.interlaced = options.interlaced;
            if (Array.isArray(options.palette))
                f.setPalette(options.palette);
        }
        gif.addFrame(f);
        return this.success();
    }
});
async function loadFrame(src, speed) {
    const img = await (0, canvas_1.loadImage)(src);
    const canvas = (0, canvas_1.createCanvas)(img.width, img.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    return gifsx_1.Frame.fromRgba(canvas.width, canvas.height, ctx.getImageData(0, 0, canvas.width, canvas.height).data, speed);
}
;
function parseArgs(str, prefix, length) {
    const args = str.slice(prefix.length).split(':');
    if (args.length !== length)
        throw new Error(`${prefix} frame expects ${length} arguments.`);
    return args;
}
;
//# sourceMappingURL=addFrame.js.map
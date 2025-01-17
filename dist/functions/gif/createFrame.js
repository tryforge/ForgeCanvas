"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("../..");
const gifsx_1 = require("@gifsx/gifsx");
exports.default = new forgescript_1.NativeFunction({
    name: '$createFrame',
    aliases: ['$createGIFFrame', '$newFrame', '$newGIFFrame'],
    description: 'Creates a new GIF Frame.',
    version: '1.2.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'frame',
            description: 'Name of the new GIF Frame.',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false
        },
        {
            name: 'src',
            description: 'Source of the GIF Frame.',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false
        },
        {
            name: 'options',
            description: 'Options for the GIF Frame.',
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
        if (!ctx.gifManager || !(ctx.gifManager instanceof __1.GIFManager))
            ctx.gifManager = new __1.GIFManager();
        let f = null;
        if (frame.startsWith('rgba://')) {
            const [size, data] = (0, __1.parseArgs)(frame, 'rgba://', 2);
            const [width, height] = size.split('x').map(Number);
            f = gifsx_1.Frame.fromRgba(width, height, data.split(',').map(Number), speed);
        }
        else if (frame.startsWith('hex://')) {
            const [size, data] = (0, __1.parseArgs)(frame, 'hex://', 2);
            const [width, height] = size.split('x').map(Number);
            f = gifsx_1.Frame.fromHex(width, height, data.split(',').map(x => x.trim()), speed);
        }
        else if (frame.startsWith('rgb://')) {
            const [size, data] = (0, __1.parseArgs)(frame, 'rgb://', 2);
            const [width, height] = size.split('x').map(Number);
            f = gifsx_1.Frame.fromRgb(width, height, data.split(',').map(Number), speed);
        }
        else if (frame.startsWith('indexed://')) {
            const [size, data] = (0, __1.parseArgs)(frame, 'indexed://', 2);
            const [width, height] = size.split('x').map(Number);
            f = gifsx_1.Frame.fromIndexedPixels(width, height, data.split(',').map(Number));
        }
        else if (frame.startsWith('images://')) {
            const img = ctx.imageManager?.get(frame.slice(9));
            if (!img)
                return this.customError('No image');
            f = await (0, __1.loadFrame)(img, speed);
        }
        else if (frame.startsWith('canvas://')) {
            const canvas = ctx.canvasManager?.get(frame.slice(9));
            if (!canvas)
                return this.customError('No canvas');
            f = gifsx_1.Frame.fromRgba(canvas.width, canvas.height, canvas.ctx.getImageData(0, 0, canvas.width, canvas.height).data, speed);
        }
        else
            f = await (0, __1.loadFrame)(frame, speed);
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
        ;
        ctx.gifManager.setFrame(name, f);
        return this.success();
    }
});
//# sourceMappingURL=createFrame.js.map
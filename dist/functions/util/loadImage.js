"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const canvas_1 = require("@napi-rs/canvas");
const gifsx_1 = require("@gifsx/gifsx");
const __1 = require("../..");
exports.default = new forgescript_1.NativeFunction({
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
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false
        },
        {
            name: 'src',
            description: 'The image source.',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false
        }
    ],
    async execute(ctx, [name, src]) {
        if (!ctx.imageManager || !(ctx.imageManager instanceof __1.ImageManager))
            ctx.imageManager = new __1.ImageManager();
        let source = null;
        if (['rgba://', 'rgb://', 'hex://'].find(x => src.startsWith(x))) {
            const [size, data] = (0, __1.parseArgs)(src, src.split('//')[0].length + 2, 2);
            const [width, height] = size.split('x').map(Number);
            const canvas = (0, canvas_1.createCanvas)(width, height);
            const context = canvas.getContext('2d');
            const imageData = context.createImageData(width, height);
            imageData.data.set(new Uint8ClampedArray(src.startsWith('hex://')
                ? (0, gifsx_1.hexToRgba)(data.split(',').map(x => x.trim()))
                : src.startsWith('rgb://')
                    ? data.split(',').map(Number).flatMap((v, i) => {
                        if ((i + 1) % 3 === 0)
                            return [v, 255];
                        return [v];
                    })
                    : data.split(',').map(Number)));
            context.putImageData(imageData, 0, 0);
            source = canvas.toBuffer('image/png');
        }
        else if (src.startsWith('canvas://')) {
            const canvas = ctx.canvasManager?.get(src.slice(9));
            if (!canvas)
                return this.customError('Invalid canvas');
            source = canvas.buffer('image/png');
        }
        else if (src.startsWith('frame://')) {
            const frame = ctx.gifManager?.getFrame(src.slice(8));
            if (!frame)
                return this.customError('No frame');
            const { width, height, buffer } = frame;
            const canvas = (0, canvas_1.createCanvas)(width, height);
            const context = canvas.getContext('2d');
            const imageData = context.createImageData(width, height);
            imageData.data.set(buffer.length === width * height * 4
                ? buffer : (0, gifsx_1.indexedToRgba)(Uint8Array.from(buffer), frame.palette ?? Uint8Array.from([]), frame.transparent));
            context.putImageData(imageData, 0, 0);
            source = canvas.toBuffer('image/png');
        }
        else
            source = src;
        if (!source)
            return this.customError('Invalid source');
        ctx.imageManager.set(name, await (0, canvas_1.loadImage)(source));
        return this.success();
    }
});

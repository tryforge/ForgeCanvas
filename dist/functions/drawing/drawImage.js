"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const canvas_1 = require("@napi-rs/canvas");
const gifsx_1 = require("@gifsx/gifsx");
exports.default = new forgescript_1.NativeFunction({
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
            type: forgescript_1.ArgType.String,
            required: false,
            rest: false
        },
        {
            name: 'path',
            description: 'The image path.',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false
        },
        {
            name: 'x',
            description: 'The image start X coordinate.',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'y',
            description: 'The image start Y coordinate.',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'width',
            description: 'The image width.',
            type: forgescript_1.ArgType.Number,
            required: false,
            rest: false
        },
        {
            name: 'height',
            description: 'The image height.',
            type: forgescript_1.ArgType.Number,
            required: false,
            rest: false
        },
        {
            name: 'radius',
            description: 'The image radius.',
            type: forgescript_1.ArgType.Number,
            required: false,
            rest: true
        }
    ],
    async execute(ctx, [name, path, x, y, w, h, r]) {
        const canvas = name
            ? ctx.canvasManager?.get(name)
            : !name && ctx.canvasManager?.current?.length !== 0
                ? ctx.canvasManager?.current?.[ctx.canvasManager?.current?.length - 1] : null;
        if (!canvas)
            return this.customError('No canvas');
        let img = path;
        if (path.startsWith('frame://')) {
            const frame = ctx.gifManager?.getFrame(path.slice(8));
            if (!frame)
                return this.customError('No frame');
            const { width, height, buffer } = frame;
            const canvas = (0, canvas_1.createCanvas)(width, height);
            const context = canvas.getContext('2d');
            const imageData = context.createImageData(width, height);
            imageData.data.set(!(buffer instanceof Uint8ClampedArray)
                ? (0, gifsx_1.hexToRgba)(buffer) : buffer);
            context.putImageData(imageData, 0, 0);
            img = canvas.toBuffer('image/png');
        }
        else if (path.startsWith('images://') && ctx.imageManager)
            img = ctx.imageManager.get(path.slice(9));
        else if (path.startsWith('canvas://'))
            img = ctx.canvasManager?.get(path.slice(9))?.buffer;
        if (!img)
            return this.customError('Failed to load an image.');
        await canvas.drawImage(img, x, y, w, h, r.length === 1 ? r[0] : r);
        return this.success();
    }
});
//# sourceMappingURL=drawImage.js.map
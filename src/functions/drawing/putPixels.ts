import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { ColorDataType, FCError } from '../..';

export default new NativeFunction({
    name: '$putPixels',
    aliases: ['$putImageData', '$setPixels'],
    description: 'Places pixels in the canvas.',
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
            name: 'pixels',
            description: 'The pixels to place.',
            type: ArgType.Json,
            required: true,
            rest: false
        },
        {
            name: 'x',
            description: 'The X coordinate of the top-left corner of the rectangle from which the pixel colors will be extracted.',
            type: ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'y',
            description: 'The Y coordinate of the top-left corner of the rectangle from which the pixel colors will be extracted.',
            type: ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'width',
            description: 'The width of the rectangle from which the pixel colors will be extracted.',
            type: ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'height',
            description: 'The height of the rectangle from which the pixel colors will be extracted.',
            type: ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'type',
            description: 'The pixels (image data) content type.',
            type: ArgType.Enum,
            enum: ColorDataType,
            required: false,
            rest: false
        }
    ],
    execute (ctx, [name, pixels, x, y, w, h, t]) {
        const canvas = name
            ? ctx.canvasManager?.get(name)
            : ctx.canvasManager?.lastCurrent;
        
        if (!canvas) return this.customError(FCError.NoCanvas);
        if (!Array.isArray(pixels)) return this.customError(FCError.ArrayExpected);

        canvas.setPixels(x, y, w, h, pixels, t);
        return this.success();
    }
});
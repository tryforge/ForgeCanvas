import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { Context, ColorDataType } from '../..';

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
    async execute (ctx: Context, [name, pixels, x, y, w, h, t]) {
        const canvas = name
            ? ctx.canvasManager?.get(name)
                : !name && ctx.canvasManager?.current?.length !== 0 
                    ? ctx.canvasManager?.current?.[ctx.canvasManager?.current?.length - 1] : null;
        
        if (!canvas) return this.customError('No canvas');
        if (!Array.isArray(pixels)) return this.customError('Invalid pixels');

        canvas.setPixels(x, y, w, h, pixels, t);
        return this.success();
    }
});
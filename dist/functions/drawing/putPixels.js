"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("../..");
exports.default = new forgescript_1.NativeFunction({
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
            type: forgescript_1.ArgType.String,
            required: false,
            rest: false
        },
        {
            name: 'pixels',
            description: 'The pixels to place.',
            type: forgescript_1.ArgType.Json,
            required: true,
            rest: false
        },
        {
            name: 'x',
            description: 'The X coordinate of the top-left corner of the rectangle from which the pixel colors will be extracted.',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'y',
            description: 'The Y coordinate of the top-left corner of the rectangle from which the pixel colors will be extracted.',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'width',
            description: 'The width of the rectangle from which the pixel colors will be extracted.',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'height',
            description: 'The height of the rectangle from which the pixel colors will be extracted.',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'type',
            description: 'The pixels (image data) content type.',
            type: forgescript_1.ArgType.Enum,
            enum: __1.ColorDataType,
            required: false,
            rest: false
        }
    ],
    execute(ctx, [name, pixels, x, y, w, h, t]) {
        const canvas = name
            ? ctx.canvasManager?.get(name)
            : ctx.canvasManager?.lastCurrent;
        if (!canvas)
            return this.customError(__1.FCError.NoCanvas);
        if (!Array.isArray(pixels))
            return this.customError(__1.FCError.ArrayExpected);
        canvas.setPixels(x, y, w, h, pixels, t);
        return this.success();
    }
});

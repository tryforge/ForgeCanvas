"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const classes_1 = require("../../classes");
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
            name: 'src',
            description: 'The image source.',
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
    async execute(ctx, [name, src, x, y, width, height, radius]) {
        const canvas = name
            ? ctx.canvasManager?.get(name)
            : ctx.canvasManager?.lastCurrent;
        if (!canvas)
            return this.customError(classes_1.FCError.NoCanvas);
        const img = await classes_1.CanvasUtil.resolveImage(this, ctx, src);
        if (img instanceof forgescript_1.Return)
            return img;
        await canvas.drawImage(img, x, y, width, height, radius.length === 1
            ? radius[0] : radius);
        return this.success();
    }
});

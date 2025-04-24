"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const canvas_1 = require("@napi-rs/canvas");
const __1 = require("../..");
exports.default = new forgescript_1.NativeFunction({
    name: '$imageSize',
    aliases: ['$imgSize', '$imageDimensions'],
    description: 'Returns image\'s size.',
    version: '1.1.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'path',
            description: 'The image path.',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false
        },
        {
            name: 'property',
            description: 'The size property to return.',
            type: forgescript_1.ArgType.Enum,
            enum: __1.WidthOrHeight,
            required: false,
            rest: false
        }
    ],
    async execute(ctx, [path, property]) {
        let image;
        if (path.startsWith('images://') && ctx.imageManager)
            image = ctx.imageManager.get(path.slice(9));
        else
            image = await (0, canvas_1.loadImage)(path);
        if (!image)
            return this.customError('Failed to load image.');
        return this.success(property !== null // @ts-ignore
            ? image[__1.WidthOrHeight[(typeof property === 'string' ? __1.WidthOrHeight[property] : property)]]
            : JSON.stringify({ width: image.width, height: image.height }));
    }
});

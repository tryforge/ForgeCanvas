"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
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
        const img = await __1.CanvasUtil.resolveImage(this, ctx, src);
        if (img instanceof forgescript_1.Return)
            return img;
        ctx.imageManager.set(name, img);
        return this.success();
    }
});

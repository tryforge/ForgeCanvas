"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("../..");
const canvas_1 = require("@napi-rs/canvas");
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
            name: 'path',
            description: 'The image path.',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false
        }
    ],
    async execute(ctx, [name, path]) {
        if (!ctx.imageManager || !(ctx.imageManager instanceof __1.ImageManager))
            ctx.imageManager = new __1.ImageManager();
        ctx.imageManager.set(name, await (0, canvas_1.loadImage)(path));
        return this.success();
    }
});
//# sourceMappingURL=loadImage.js.map
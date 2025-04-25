"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const canvas_1 = require("@napi-rs/canvas");
const classes_1 = require("../../classes");
exports.default = new forgescript_1.NativeFunction({
    name: '$imageBuffer',
    description: 'Returns image\'s buffer.',
    version: '1.2.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'path',
            description: 'The image path.',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false
        }
    ],
    async execute(ctx, [path]) {
        let image;
        if (path.startsWith('images://') && ctx.imageManager)
            image = ctx.imageManager.get(path.slice(9));
        else
            image = await (0, canvas_1.loadImage)(path);
        if (!image)
            return this.customError(classes_1.FCError.NoImage);
        return this.success(`[${Array.from(await image.getBuffer() ?? []).join(', ')}]`);
    }
});

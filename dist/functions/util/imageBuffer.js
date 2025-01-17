"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const canvas_1 = require("@napi-rs/canvas");
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
            return this.customError('Invalid image');
        return this.success(typeof image.src !== 'string'
            ? `[${Array.from(image.src).join(', ')}]`
            : image.src);
    }
});
//# sourceMappingURL=imageBuffer.js.map
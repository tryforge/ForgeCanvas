"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("../..");
const canvas_1 = require("@napi-rs/canvas");
exports.default = new forgescript_1.NativeFunction({
    name: '$imageSize',
    description: 'Returns image\'s size.',
    version: '1.0.0',
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
    async execute(_, [path, property]) {
        const image = await (0, canvas_1.loadImage)(path, { maxRedirects: 30 });
        return this.success(property //@ts-ignore
            ? image[__1.WidthOrHeight[(typeof property === 'number' ? __1.WidthOrHeight[property] : property)]]
            : JSON.stringify({ width: image.width, height: image.height }));
    }
});
//# sourceMappingURL=imageSize.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("forgescript");
const __1 = require("..");
exports.default = new forgescript_1.NativeFunction({
    name: "$drawImage",
    version: "1.0.0",
    description: "Draws an image on canvas",
    unwrap: true,
    args: [
        {
            name: "url",
            description: "The url of the image",
            rest: false,
            type: forgescript_1.ArgType.URL,
            required: true,
        },
        {
            name: "x",
            description: "The x you want to place the image",
            rest: false,
            type: forgescript_1.ArgType.Number,
            required: true,
        },
        {
            name: "y",
            description: "The y you want to place the image",
            rest: false,
            type: forgescript_1.ArgType.Number,
            required: true,
        },
        {
            name: "width",
            description: "The width of the image",
            rest: false,
            type: forgescript_1.ArgType.Number,
            required: false,
        },
        {
            name: "height",
            description: "The height of the image",
            rest: false,
            type: forgescript_1.ArgType.Number,
            required: false,
        }
    ],
    brackets: true,
    async execute(_ctx, [url, x, y, height, width]) {
        await __1.ForgeCanvas.drawImage(url, x, y, height, width);
        return this.success();
    },
});
//# sourceMappingURL=drawImage.js.map
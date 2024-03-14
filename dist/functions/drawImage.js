"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("..");
const classes_1 = require("../classes");
exports.default = new forgescript_1.NativeFunction({
    name: "$drawImage",
    version: "0.1.0",
    description: "Draws an image on canvas",
    unwrap: true,
    args: [
        {
            name: "canvas",
            description: "The name of the canvas where the image will be placed.",
            rest: false,
            type: forgescript_1.ArgType.String,
            required: true,
        },
        {
            name: "link",
            description: "The link to the image",
            rest: false,
            type: forgescript_1.ArgType.String,
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
        },
        {
            name: "radius",
            description: "The radius of image corners.",
            rest: false,
            type: forgescript_1.ArgType.Number,
            required: false,
        }
    ],
    brackets: true,
    async execute(_ctx, [canvas, link, x, y, width, height, radius]) {
        if (!__1.ForgeCanvas.canvases || !__1.ForgeCanvas.canvases[canvas] || !(__1.ForgeCanvas.canvases[canvas] instanceof classes_1.CanvasBuilder))
            return this.customError("No canvas with provided name.");
        await __1.ForgeCanvas.canvases[canvas].drawImage(link, x, y, width, height, radius);
        return this.success();
    },
});
//# sourceMappingURL=drawImage.js.map
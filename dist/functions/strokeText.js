"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const classes_1 = require("../classes");
const __1 = require("..");
exports.default = new forgescript_1.NativeFunction({
    name: "$strokeText",
    version: "0.1.0",
    description: "Draws text stroke in provided canvas.",
    unwrap: true,
    brackets: true,
    args: [
        {
            name: "canvas",
            description: "The name of canvas to draw text on.",
            rest: false,
            type: forgescript_1.ArgType.String,
            required: true
        },
        {
            name: "text",
            description: "The text to draw.",
            rest: false,
            type: forgescript_1.ArgType.String,
            required: true
        },
        {
            name: "x",
            description: "The X position of text.",
            rest: false,
            type: forgescript_1.ArgType.Number,
            required: true
        },
        {
            name: "y",
            description: "The Y position of text.",
            rest: false,
            type: forgescript_1.ArgType.Number,
            required: true
        },
        {
            name: "font",
            description: "The text font.",
            rest: false,
            type: forgescript_1.ArgType.String,
            required: true
        },
        {
            name: "color",
            description: "The text color.",
            rest: false,
            type: forgescript_1.ArgType.Color,
            required: true
        },
        {
            name: "width",
            description: "The stroke width.",
            rest: false,
            type: forgescript_1.ArgType.Number,
            required: false
        }
    ],
    execute(_ctx, [canvas, text, x, y, font, color, width]) {
        if (!__1.ForgeCanvas.canvases || !__1.ForgeCanvas.canvases[canvas] || !(__1.ForgeCanvas.canvases[canvas] instanceof classes_1.CanvasBuilder))
            return this.customError("No canvas with provided name.");
        __1.ForgeCanvas.canvases[canvas].strokeText(text, x, y, font, color, width);
        return this.success();
    },
});
//# sourceMappingURL=strokeText.js.map
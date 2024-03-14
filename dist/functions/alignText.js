"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("..");
const classes_1 = require("../classes");
exports.default = new forgescript_1.NativeFunction({
    name: "$alignText",
    version: "0.2.0",
    description: "Change the text alignment for related functions.",
    unwrap: true,
    brackets: true,
    args: [
        {
            name: "canvas",
            description: "The name of the canvas where the image will be placed.",
            rest: false,
            type: forgescript_1.ArgType.String,
            required: true,
        },
        {
            name: "alignment",
            description: "The alignment that the text should follow",
            rest: false,
            type: forgescript_1.ArgType.Enum,
            enum: classes_1.TextAlign,
            required: true,
        }
    ],
    execute(_ctx, [canvas, alignment]) {
        if (!__1.ForgeCanvas.canvases || !__1.ForgeCanvas.canvases[canvas] || !(__1.ForgeCanvas.canvases[canvas] instanceof classes_1.CanvasBuilder))
            return this.customError("No canvas with provided name.");
        __1.ForgeCanvas.canvases[canvas].setTextAlignment(alignment);
        return this.success();
    },
});
//# sourceMappingURL=alignText.js.map
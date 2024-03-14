"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("..");
const classes_1 = require("../classes");
exports.default = new forgescript_1.NativeFunction({
    name: "$createCanvas",
    version: "0.1.0",
    description: "Create new blank canvas.",
    unwrap: true,
    args: [
        {
            name: "name",
            description: "The name of the canvas",
            rest: false,
            type: forgescript_1.ArgType.String,
            required: true
        },
        {
            name: "width",
            description: "The width of the canvas",
            rest: false,
            type: forgescript_1.ArgType.Number,
            required: true
        },
        {
            name: "height",
            description: "The height of the canvas",
            rest: false,
            type: forgescript_1.ArgType.Number,
            required: true
        }
    ],
    brackets: true,
    async execute(_ctx, [name, width, height]) {
        if (!__1.ForgeCanvas.canvases)
            __1.ForgeCanvas.canvases = {};
        __1.ForgeCanvas.canvases[name] = new classes_1.CanvasBuilder(width, height);
        return this.success();
    },
});
//# sourceMappingURL=createCanvas.js.map
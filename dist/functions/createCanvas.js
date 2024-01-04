"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("forgescript");
const __1 = require("..");
exports.default = new forgescript_1.NativeFunction({
    name: "$createCanvas",
    description: "Create new blank canvas.",
    unwrap: true,
    args: [
        {
            name: "width",
            description: "The width of the canvas",
            rest: false,
            type: forgescript_1.ArgType.Number,
            required: true,
        },
        {
            name: "height",
            description: "The height of the canvas",
            rest: false,
            type: forgescript_1.ArgType.Number,
            required: true,
        }
    ],
    brackets: true,
    async execute(_ctx, [width, height]) {
        await __1.ForgeCanvas.create(width, height);
        return this.success();
    },
});
//# sourceMappingURL=createCanvas.js.map
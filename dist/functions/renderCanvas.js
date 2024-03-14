"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("..");
exports.default = new forgescript_1.NativeFunction({
    name: "$renderCanvas",
    version: "0.1.0",
    description: "Renders and attaches the canvas.",
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
            name: "name",
            description: "The name with the extension of the image to be attached as",
            rest: false,
            type: forgescript_1.ArgType.String,
            required: true,
        }
    ],
    execute(ctx, [canvas, name]) {
        const attachment = new discord_js_1.AttachmentBuilder(__1.ForgeCanvas.canvases[canvas].render(), {
            name
        });
        ctx.container.files.push(attachment);
        return this.success();
    },
});
//# sourceMappingURL=renderCanvas.js.map
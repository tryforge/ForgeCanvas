"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const forgescript_1 = require("forgescript");
const __1 = require("..");
exports.default = new forgescript_1.NativeFunction({
    name: "$renderCanvas",
    version: "1.0.0",
    description: "Returns the version of ForgeDB",
    unwrap: true,
    brackets: true,
    args: [
        {
            name: "name",
            description: "The name with the extension of the image to be attached as",
            rest: false,
            type: forgescript_1.ArgType.String,
            required: true,
        }
    ],
    execute(ctx, [name]) {
        const attachment = new discord_js_1.AttachmentBuilder(__1.ForgeCanvas.render(), {
            name
        });
        ctx.container.files.push(attachment);
        return this.success();
    },
});
//# sourceMappingURL=renderCanvas.js.map
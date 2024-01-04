"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const forgescript_1 = require("forgescript");
const __1 = require("..");
exports.default = new forgescript_1.NativeFunction({
    name: "$renderCanvas",
    version: "1.0.0",
    description: "Returns the version of ForgeDB",
    unwrap: false,
    execute(ctx) {
        const attachment = new discord_js_1.AttachmentBuilder(__1.ForgeCanvas.render(), {
            name: "test.png"
        });
        ctx.container.files.push(attachment);
        return this.success();
    },
});
//# sourceMappingURL=renderCanvas.js.map
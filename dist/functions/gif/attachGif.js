"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const discord_js_1 = require("discord.js");
exports.default = new forgescript_1.NativeFunction({
    name: '$attachGIF',
    description: 'Attaches the GIF.',
    version: '1.1.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'gif',
            description: 'Name of the GIF.',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false
        },
        {
            name: 'filename',
            description: 'The GIF attachment file name.',
            type: forgescript_1.ArgType.String,
            required: false,
            rest: false
        }
    ],
    async execute(ctx, [gifName, filename]) {
        const gif = ctx.gifManager?.get(gifName);
        if (!gif) {
            return this.customError('No GIF with the provided name found.');
        }
        ctx.container.files.push(new discord_js_1.AttachmentBuilder(gif.out.getData(), {
            name: filename ? filename.replace(/\{gif\}/g, gifName) : `${gifName}.gif`
        }));
        return this.success();
    }
});
//# sourceMappingURL=attachGif.js.map
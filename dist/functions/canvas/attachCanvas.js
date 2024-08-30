"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const discord_js_1 = require("discord.js");
exports.default = new forgescript_1.NativeFunction({
    name: '$attachCanvas',
    description: 'Attaches the canvas.',
    version: '1.0.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'name',
            description: 'Name of the canvas.',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false
        },
        {
            name: 'filename',
            description: 'The name with the extension of the image to be attached as.',
            type: forgescript_1.ArgType.String,
            required: false,
            rest: false
        }
    ],
    async execute(ctx, [name, filename]) {
        const canvas = ctx.canvasManager?.get(name);
        if (!canvas)
            return this.customError('No canvas');
        ctx.container.files.push(new discord_js_1.AttachmentBuilder(canvas.buffer, {
            name: filename ?? `${name}.png`
        }));
        return this.success();
    }
});
//# sourceMappingURL=attachCanvas.js.map
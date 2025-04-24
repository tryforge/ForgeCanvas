"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const discord_js_1 = require("discord.js");
const __1 = require("../..");
exports.default = new forgescript_1.NativeFunction({
    name: '$attachCanvas',
    aliases: ['$sendCanvas', '$renderCanvas', '$canvasRender'],
    description: 'Attaches the canvas.',
    version: '1.0.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'canvas',
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
        },
        {
            name: 'format',
            description: 'The image format.',
            type: forgescript_1.ArgType.Enum,
            enum: __1.ImageFormat,
            required: false,
            rest: false
        }
    ],
    async execute(ctx, [name, filename, f]) {
        const canvas = ctx.canvasManager?.get(name);
        if (!canvas)
            return this.customError('No canvas');
        ctx.container.files.push(new discord_js_1.AttachmentBuilder(canvas.buffer((f !== null
            ? 'image/' + (typeof f === 'number' ? __1.ImageFormat[f] : f)
            : 'image/png')), {
            name: filename ?? `${name}.png`
        }));
        return this.success();
    }
});

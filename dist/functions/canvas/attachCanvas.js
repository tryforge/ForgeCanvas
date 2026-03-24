"use strict";
/*
* SPDX-License-Identifier: LGPL-3.0-or-later
* Copyright © 2026 BotForge
*/
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const discord_js_1 = require("discord.js");
const __1 = require("../..");
exports.default = new forgescript_1.NativeFunction({
    name: '$attachCanvas',
    aliases: ['$sendCanvas', '$renderCanvas', '$canvasRender'],
    description: 'Creates a new canvas',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'canvas',
            description: 'Name of the canvas',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false
        },
        {
            name: 'filename',
            description: 'The name with the extension of the image to be attached as',
            type: forgescript_1.ArgType.String,
            required: false,
            rest: false
        },
        {
            name: 'format',
            description: 'The image format',
            type: forgescript_1.ArgType.Enum,
            enum: __1.ImageFormat,
            required: false,
            rest: false
        }
    ],
    async execute(ctx, [name, file, format]) {
        const canvas = ctx.canvasManager?.get(name)?.inner;
        if (!canvas)
            return this.customError(__1.ForgeCanvasError.NoCanvas);
        ctx.container.files.push(new discord_js_1.AttachmentBuilder(// @ts-ignore
        await canvas.encode((typeof format === 'number' ? __1.ImageFormat[format] : format) ?? 'png'), { name: file ?? `${name}.png` }));
        return this.success();
    }
});

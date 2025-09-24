"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const gifsx_1 = require("@gifsx/gifsx");
const __1 = require("../..");
exports.default = new forgescript_1.NativeFunction({
    name: '$decodeOptions',
    aliases: ['$decoderOptions'],
    description: 'Creates new GIF Decode Options.',
    version: '1.2.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'name',
            description: 'Name of the new GIF Decode Options.',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false
        },
        {
            name: 'options',
            description: 'Options.',
            type: forgescript_1.ArgType.Unknown,
            required: false,
            rest: true
        }
    ],
    execute(ctx, [name]) {
        if (!ctx.gifManager || !(ctx.gifManager instanceof __1.GIFManager))
            ctx.gifManager = new __1.GIFManager();
        if (ctx.gifManager.currentOptions) {
            ctx.gifManager.setDecodeOptions(name, ctx.gifManager.currentOptions);
            ctx.gifManager.currentOptions = null;
        }
        else
            ctx.gifManager.setDecodeOptions(name, new gifsx_1.DecodeOptions());
        return this.success();
    }
});

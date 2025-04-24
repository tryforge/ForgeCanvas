"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("../..");
const gifsx_1 = require("@gifsx/gifsx");
exports.default = new forgescript_1.NativeFunction({
    name: '$setColorOutput',
    aliases: ['$setOutputColor'],
    description: 'Configure the color output for the GIF Decoder.',
    version: '1.2.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'name',
            description: 'Name of the Decode Options.',
            type: forgescript_1.ArgType.String,
            required: false,
            rest: false
        },
        {
            name: 'output',
            description: 'The color output type.',
            type: forgescript_1.ArgType.Enum,
            enum: __1.ColorOutput,
            required: true,
            rest: false
        }
    ],
    async execute(ctx, [name, output]) {
        if (!ctx.gifManager || !(ctx.gifManager instanceof __1.GIFManager))
            ctx.gifManager = new __1.GIFManager();
        if (!name && !ctx.gifManager.currentOptions)
            ctx.gifManager.currentOptions = new gifsx_1.DecodeOptions();
        const options = name
            ? ctx.gifManager.getDecodeOptions(name)
            : ctx.gifManager.currentOptions;
        if (!options)
            return this.customError('No decode options');
        options.setColorOutput(output);
        return this.success();
    }
});

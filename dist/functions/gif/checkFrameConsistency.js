"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const gifsx_1 = require("@gifsx/gifsx");
const __1 = require("../..");
exports.default = new forgescript_1.NativeFunction({
    name: '$checkFrameConsistency',
    aliases: ['$checkFrame', '$frameConsistency'],
    description: 'Configure if frames must be within the screen descriptor.',
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
            name: 'boolean',
            description: 'If frames must be within the screen descriptor.',
            type: forgescript_1.ArgType.Boolean,
            required: true,
            rest: false
        }
    ],
    execute(ctx, [name, bool]) {
        if (!ctx.gifManager || !(ctx.gifManager instanceof __1.GIFManager))
            ctx.gifManager = new __1.GIFManager();
        if (!name && !ctx.gifManager.currentOptions)
            ctx.gifManager.currentOptions = new gifsx_1.DecodeOptions();
        const options = name
            ? ctx.gifManager.getDecodeOptions(name)
            : ctx.gifManager.currentOptions;
        if (options)
            options.checkFrameConsistency(bool);
        return this.success();
    }
});

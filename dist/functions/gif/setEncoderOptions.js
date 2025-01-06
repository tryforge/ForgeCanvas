"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("../..");
const gifsx_1 = require("@gifsx/gifsx");
exports.default = new forgescript_1.NativeFunction({
    name: '$setEncoderOptions',
    aliases: ['$setGIFOptions', '$setEncoderConfig', '$setGIFConfig'],
    description: 'Sets the size and global palette for the new GIF encoder.',
    version: '1.2.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'width',
            description: 'Width of the new canvas.',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'height',
            description: 'Height of the new canvas.',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'palette',
            description: 'Palette for the GIF.',
            type: forgescript_1.ArgType.Json,
            required: false,
            rest: false
        }
    ],
    async execute(ctx, [w, h, palette]) {
        if (!ctx.gifManager || !(ctx.gifManager instanceof __1.GIFManager))
            ctx.gifManager = new __1.GIFManager();
        if (!Array.isArray(palette))
            return this.customError('The global palette must be an array.');
        ctx.gifManager.currentEncoder.push(new gifsx_1.Encoder(w, h, palette));
        return this.success();
    }
});
//# sourceMappingURL=setEncoderOptions.js.map
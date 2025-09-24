"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const classes_1 = require("../../classes");
exports.default = new forgescript_1.NativeFunction({
    name: '$GIFEncoderGlobalPalette',
    aliases: ['$encoderGlobalPalette', '$globalPalette'],
    description: 'Gets the global palette of the GIF Encoder.',
    version: '1.2.0',
    brackets: false,
    unwrap: true,
    args: [
        {
            name: 'gif',
            description: 'Name of the GIF.',
            type: forgescript_1.ArgType.String,
            required: false,
            rest: false
        }
    ],
    execute(ctx, [name]) {
        const gif = name
            ? ctx.gifManager?.getEncoder(name)
            : ctx.gifManager?.lastCurrentEncoder;
        if (!gif)
            return this.customError(classes_1.FCError.NoEncoder);
        return this.success(gif.palette !== null
            ? `[${Array.from(gif.palette).join(', ')}]` : null);
    }
});

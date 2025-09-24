"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const classes_1 = require("../../classes");
exports.default = new forgescript_1.NativeFunction({
    name: '$setEncoderLoops',
    aliases: [
        '$setEncoderRepeat',
        '$setGIFEncoderRepeat',
        '$setGIFEncoderLoops',
        '$setLoops',
        '$setRepeat'
    ],
    description: 'Sets the number of loops for the GIF Encoder.',
    version: '1.2.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'gif',
            description: 'Name of the GIF.',
            type: forgescript_1.ArgType.String,
            required: false,
            rest: false
        },
        {
            name: 'loops',
            description: 'Number of loops.',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        }
    ],
    execute(ctx, [name, loops]) {
        const gif = name
            ? ctx.gifManager?.getEncoder(name)
            : ctx.gifManager?.lastCurrentEncoder;
        if (!gif)
            return this.customError(classes_1.FCError.NoEncoder);
        gif.setRepeat(loops);
        return this.success();
    }
});

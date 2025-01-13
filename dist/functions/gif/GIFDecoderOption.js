"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("../..");
exports.default = new forgescript_1.NativeFunction({
    name: '$GIFDecoderOption',
    aliases: ['$decoderOption', '$GIFDecoderProperty', '$decoderProperty'],
    description: 'Sets or returns a GIF Frame option.',
    version: '1.2.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'gif',
            description: 'Name of the Decoder.',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false
        },
        {
            name: 'option',
            description: 'Option to get.',
            type: forgescript_1.ArgType.Enum,
            enum: __1.DecoderOption,
            required: true,
            rest: false
        }
    ],
    async execute(ctx, [name, option]) {
        const gif = ctx.gifManager?.getDecoder(name);
        if (!gif)
            return this.customError('No frame');
        const opt = gif?.[(typeof option === 'number'
            ? __1.DecoderOption[option] : option)];
        if (opt instanceof Uint8ClampedArray || opt instanceof ArrayBuffer) {
            if (opt instanceof Uint8ClampedArray)
                return this.success(`[${Array.from(opt).join(', ')}]`);
            return this.success(`[${Array.from(new Uint8Array(opt)).join(', ')}]`);
        }
        ;
        return this.success(opt);
    }
});
//# sourceMappingURL=GIFDecoderOption.js.map
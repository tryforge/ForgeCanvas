"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("../..");
exports.default = new forgescript_1.NativeFunction({
    name: '$fontVariantCaps',
    aliases: ['$fontCaps'],
    description: 'Sets or returns the capitalization of the text.',
    version: '1.1.0',
    brackets: false,
    unwrap: true,
    args: [
        {
            name: 'canvas',
            description: 'Name of the canvas.',
            type: forgescript_1.ArgType.String,
            required: false,
            rest: false
        },
        {
            name: 'type',
            description: 'The new alternative capitalization.',
            type: forgescript_1.ArgType.Enum,
            enum: __1.FontVariantCaps,
            required: false,
            rest: false
        }
    ],
    async execute(ctx, [name, t]) {
        const canvas = (name
            ? ctx.canvasManager?.get(name)
            : !name && ctx.canvasManager?.current?.length !== 0
                ? ctx.canvasManager?.current?.[ctx.canvasManager?.current?.length - 1] : null)?.ctx;
        if (!canvas)
            return this.customError('No canvas');
        return this.success(t !== null
            ? (canvas.fontVariantCaps = (typeof t === 'number'
                ? __1.FontVariantCaps[t]
                : t), undefined) : canvas.fontVariantCaps);
    }
});
//# sourceMappingURL=fontVariantCaps.js.map
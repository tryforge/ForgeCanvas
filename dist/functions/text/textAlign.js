"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("../..");
exports.default = new forgescript_1.NativeFunction({
    name: '$textAlign',
    aliases: ['$alignText'],
    description: 'Sets or returns the text align.',
    version: '1.0.0',
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
            name: 'align',
            description: 'The new align.',
            type: forgescript_1.ArgType.Enum,
            enum: __1.TextAlign,
            required: false,
            rest: false
        }
    ],
    execute(ctx, [name, align]) {
        const canvas = (name
            ? ctx.canvasManager?.get(name)
            : ctx.canvasManager?.lastCurrent)?.ctx;
        if (!canvas)
            return this.customError(__1.FCError.NoCanvas);
        return this.success(align !== null
            ? (canvas.textAlign = (typeof align === 'number' ? __1.TextAlign[align] : align), undefined) : typeof canvas.textAlign === 'number'
            ? __1.TextAlign[canvas.textAlign]
            : canvas.textAlign ?? 'start');
    }
});

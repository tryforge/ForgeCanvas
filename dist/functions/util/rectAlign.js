"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("../..");
exports.default = new forgescript_1.NativeFunction({
    name: '$rectAlign',
    aliases: ['$alignRect', '$alignImage', '$imageAlign'],
    description: 'Sets or returns the rect/image align.',
    version: '1.2.0',
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
            enum: __1.RectAlign,
            required: false,
            rest: false
        }
    ],
    execute(ctx, [name, align]) {
        const canvas = name
            ? ctx.canvasManager?.get(name)
            : ctx.canvasManager?.lastCurrent;
        if (!canvas)
            return this.customError(__1.FCError.NoCanvas);
        return this.success(align !== null
            ? (canvas.customProperties.rectAlign = (typeof align === 'number' ? __1.RectAlign[align] : align), undefined) : typeof canvas.customProperties?.rectAlign === 'number'
            ? __1.RectAlign[canvas.customProperties.rectAlign]
            : canvas.customProperties?.rectAlign ?? 'left');
    }
});

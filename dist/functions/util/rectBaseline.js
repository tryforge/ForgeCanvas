"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("../..");
exports.default = new forgescript_1.NativeFunction({
    name: '$rectBaseline',
    aliases: ['$imageBaseline'],
    description: 'Sets or returns the rect/image baseline.',
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
            name: 'baseline',
            description: 'The new baseline.',
            type: forgescript_1.ArgType.Enum,
            enum: __1.RectBaseline,
            required: false,
            rest: false
        }
    ],
    async execute(ctx, [name, baseline]) {
        const canvas = name
            ? ctx.canvasManager?.get(name)
            : !name && ctx.canvasManager?.current?.length !== 0
                ? ctx.canvasManager?.current?.[ctx.canvasManager?.current?.length - 1] : null;
        if (!canvas)
            return this.customError('No canvas');
        return this.success(baseline
            ? (canvas.customProperties.rectBaseline = baseline,
                undefined) : __1.RectBaseline[canvas.customProperties?.rectBaseline ?? 'bottom']);
    }
});
//# sourceMappingURL=rectBaseline.js.map
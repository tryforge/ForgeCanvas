"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("../..");
exports.default = new forgescript_1.NativeFunction({
    name: '$canvasSize',
    aliases: ['$canvasDimensions'],
    description: 'Returns canvas size.',
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
            name: 'property',
            description: 'The size property to return.',
            type: forgescript_1.ArgType.Enum,
            enum: __1.WidthOrHeight,
            required: false,
            rest: false
        }
    ],
    async execute(ctx, [name, property]) {
        const canvas = name
            ? ctx.canvasManager?.get(name)
            : !name && ctx.canvasManager?.current?.length !== 0
                ? ctx.canvasManager?.current?.[ctx.canvasManager?.current?.length - 1] : null;
        if (!canvas)
            return this.customError('No canvas');
        console.log(property, typeof property, __1.WidthOrHeight[(typeof property === 'string' ? __1.WidthOrHeight[property] : property)]);
        return this.success(property !== null // @ts-ignore
            ? canvas[__1.WidthOrHeight[(typeof property === 'string' ? __1.WidthOrHeight[property] : property)]]
            : JSON.stringify({ width: canvas.width, height: canvas.height }));
    }
});
//# sourceMappingURL=canvasSize.js.map
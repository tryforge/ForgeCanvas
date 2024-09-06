"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("../../");
const canvas_1 = require("@napi-rs/canvas");
exports.default = new forgescript_1.NativeFunction({
    name: '$strokeStyle',
    description: 'Sets or returns the stroke style in a canvas.',
    version: '1.0.0',
    brackets: true,
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
            description: 'The style type.',
            type: forgescript_1.ArgType.Enum,
            enum: __1.StyleType,
            required: true,
            rest: false
        },
        {
            name: 'style',
            description: 'The style.',
            type: forgescript_1.ArgType.String,
            required: false,
            rest: false
        }
    ],
    async execute(ctx, [name, t, style]) {
        const canvas = name
            ? ctx.canvasManager?.get(name)
            : !name && ctx.canvasManager?.current?.length !== 0
                ? ctx.canvasManager?.current?.[ctx.canvasManager?.current?.length - 1] : null;
        if (!canvas)
            return this.customError('No canvas');
        if (!style)
            return this.success(canvas.ctx.strokeStyle);
        if (t === __1.StyleType.color) {
            style = __1.hexRegex.test(style) ? style
                : (__1.rgbaRegex.test(style) ? (() => {
                    const match = style.match(__1.rgbaRegex);
                    return __1.CanvasUtil.rgbaToHex(parseInt(match[1], 10), parseInt(match[2], 10), parseInt(match[3], 10), match[5] ? parseFloat(match[5]) : undefined);
                })() : __1.Colors[style]);
        }
        else if (t === __1.StyleType.gradient) {
            const gradient = ctx.gradientManager?.get(style);
            if (!gradient)
                return this.customError('No gradient');
            // @ts-ignore
            style = gradient;
        }
        else {
            const splits = style.split(':'), type = splits.shift()?.toLowerCase(), repeat = splits.length > 0 && ['repeat', 'repeat-x', 'repeat-y', 'no-repeat'].includes(splits[splits.length - 1]) ? splits.pop() : null;
            let image;
            if (type === 'canvas') {
                const canvas_2 = ctx.canvasManager?.get(repeat ? splits.join(':') : splits.join())?.ctx;
                if (!canvas_2)
                    return this.customError('No canvas with provided name found. (pattern)');
                image = canvas_2.getImageData(0, 0, canvas_2.canvas.width, canvas_2.canvas.height);
            }
            else if (type === 'image')
                image = await (0, canvas_1.loadImage)(repeat ? splits.join(':') : splits.join(), { maxRedirects: 30 });
            else
                return this.customError('Invalid pattern type.');
            // @ts-ignore
            style = canvas.ctx.createPattern(image, repeat);
        }
        ;
        if (!style)
            return this.customError('Invalid style');
        canvas.ctx.strokeStyle = style;
        return this.success();
    }
});
//# sourceMappingURL=strokeStyle.js.map
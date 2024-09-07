"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const canvas_1 = require("@napi-rs/canvas");
const __1 = require("../..");
exports.default = new forgescript_1.NativeFunction({
    name: '$drawText',
    description: 'Draws a filled/stroked text on a canvas.',
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
            description: 'The text type.',
            type: forgescript_1.ArgType.Enum,
            enum: __1.FillOrStroke,
            required: true,
            rest: false
        },
        {
            name: 'text',
            description: 'The text to draw.',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false
        },
        {
            name: 'font',
            description: 'The font text.',
            type: forgescript_1.ArgType.String,
            check: (i) => __1.CanvasUtil.isValidFont(i),
            required: true,
            rest: false
        },
        {
            name: 'style',
            description: 'The style. (color/gradient/pattern)',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false
        },
        {
            name: 'x',
            description: 'The text start X coordinate.',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'y',
            description: 'The text start Y coordinate.',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'maxWidth',
            description: 'Maximum font width.',
            type: forgescript_1.ArgType.Number,
            required: false,
            rest: false
        },
        {
            name: 'multiline',
            description: 'Indicates if the text should be drawn in multiple lines if it exceeds the maximum width.',
            type: forgescript_1.ArgType.Boolean,
            required: false,
            rest: false
        },
        {
            name: 'wrap',
            description: 'Wraps the text if true.',
            type: forgescript_1.ArgType.Boolean,
            required: false,
            rest: false
        },
        {
            name: 'lineOffset',
            description: 'The text lines offset.',
            type: forgescript_1.ArgType.Number,
            required: false,
            rest: false
        },
    ],
    async execute(ctx, [name, t, text, font, style, x, y, maxWidth, multiline, wrap, lineOffset]) {
        const canvas = name
            ? ctx.canvasManager?.get(name)
            : !name && ctx.canvasManager?.current?.length !== 0
                ? ctx.canvasManager?.current?.[ctx.canvasManager?.current?.length - 1] : null;
        if (!canvas)
            return this.customError('No canvas');
        let s = style.split(':');
        if (s[0] === 'gradient' && s[1] === '//') {
            const gradient = ctx.gradientManager?.get(s.slice(2).join(':'));
            if (!gradient)
                return this.customError('No gradient');
            s = gradient;
        }
        else if (s[0] === 'pattern' && s[1] === '//') {
            const splits = s.slice(2), type = splits.shift()?.toLowerCase(), repeat = splits.length > 0 && ['repeat', 'repeat-x', 'repeat-y', 'no-repeat'].includes(splits[splits.length - 1]) ? splits.pop() : null;
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
            s = canvas.ctx.createPattern(image, repeat);
        }
        else {
            s = __1.hexRegex.test(style) ? style
                : (__1.rgbaRegex.test(style) ? (() => {
                    const match = style.match(__1.rgbaRegex);
                    return __1.CanvasUtil.rgbaToHex(parseInt(match[1], 10), parseInt(match[2], 10), parseInt(match[3], 10), match[5] ? parseFloat(match[5]) : undefined);
                })() : __1.Colors[style]);
        }
        ;
        const styleT = t === __1.FillOrStroke.fill ? 'fillStyle' : 'strokeStyle', oldstyle = canvas.ctx[styleT];
        canvas.ctx[styleT] = s;
        canvas.text(t, text, x, y, font, maxWidth, multiline, wrap, lineOffset);
        canvas.ctx[styleT] = oldstyle;
        return this.success();
    }
});
//# sourceMappingURL=drawText.js.map
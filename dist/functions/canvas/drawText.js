"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("../../");
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
    async execute(ctx, [name, t, text, font, x, y, maxWidth, multiline, wrap, lineOffset]) {
        const canvas = name
            ? ctx.canvasManager?.get(name)
            : !name && ctx.canvasManager?.current?.length !== 0
                ? ctx.canvasManager?.current?.[ctx.canvasManager?.current?.length - 1] : null;
        if (!canvas)
            return this.customError('No canvas');
        console.log(t, text, font, x, y, maxWidth, multiline, wrap, lineOffset);
        canvas.text(t, text, x, y, font, maxWidth, multiline, wrap, lineOffset);
        return this.success();
    }
});
//# sourceMappingURL=drawText.js.map
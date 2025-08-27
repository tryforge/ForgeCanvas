import { NativeFunction, ArgType, Return } from '@tryforge/forgescript';
import { CanvasUtil, FCError, FillOrStroke } from '../..';

export default new NativeFunction({
    name: '$drawText',
    aliases: ['$placeText', '$text', '$writeText'],
    description: 'Draws a filled/stroked text on a canvas.',
    version: '1.0.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'canvas',
            description: 'Name of the canvas.',
            type: ArgType.String,
            required: false,
            rest: false
        },
        {
            name: 'type',
            description: 'The text type.',
            type: ArgType.Enum,
            enum: FillOrStroke,
            required: true,
            rest: false
        },
        {
            name: 'text',
            description: 'The text to draw.',
            type: ArgType.String,
            required: true,
            rest: false
        },
        {
            name: 'font',
            description: 'The text font. ({size}px {font name})',
            type: ArgType.String,
            check: (i: string) => CanvasUtil.isValidFont(i),
            required: true,
            rest: false
        },
        {
            name: 'style',
            description: 'The style. (color/gradient/pattern)',
            type: ArgType.String,
            required: true,
            rest: false
        },
        {
            name: 'x',
            description: 'The text start X coordinate.',
            type: ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'y',
            description: 'The text start Y coordinate.',
            type: ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'maxWidth',
            description: 'Maximum font width.',
            type: ArgType.Number,
            required: false,
            rest: false
        },
        {
            name: 'multiline',
            description: 'Indicates if the text should be drawn in multiple lines if it exceeds the maximum width.',
            type: ArgType.Boolean,
            required: false,
            rest: false
        },
        {
            name: 'wrap',
            description: 'Wraps the text if true.',
            type: ArgType.Boolean,
            required: false,
            rest: false
        },
        {
            name: 'lineOffset',
            description: 'The text lines offset.',
            type: ArgType.Number,
            required: false,
            rest: false
        }
    ],
    async execute (ctx, [name, t, text, font, style, x, y, maxWidth, multiline, wrap, lineOffset]) {
        const canvas = name
            ? ctx.canvasManager?.get(name)
            : ctx.canvasManager?.lastCurrent;
        if (!canvas) return this.customError(FCError.NoCanvas);

        const styleT = t === FillOrStroke.fill ? 'fillStyle' : 'strokeStyle',
              s = await CanvasUtil.resolveStyle(this, ctx, canvas, style);
        if (s instanceof Return) return s;
        
        canvas.ctx[styleT] = s;
        canvas.text(
            t,
            text,
            x, y,
            font,
            maxWidth,
            multiline,
            wrap,
            lineOffset
        );
        
        return this.success();
    }
});
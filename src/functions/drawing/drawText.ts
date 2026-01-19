import { ArgType, NativeFunction, Return } from '@tryforge/forgescript';
import { CanvasUtil, FCError, FillOrStroke, TextAlign, TextWrap } from '../..';

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
            description: 'Name of the canvas',
            type: ArgType.String,
            required: false,
            rest: false
        },
        {
            name: 'type',
            description: 'The text type',
            type: ArgType.Enum,
            enum: FillOrStroke,
            required: true,
            rest: false
        },
        {
            name: 'text',
            description: 'The text to draw',
            type: ArgType.String,
            required: true,
            rest: false
        },
        {
            name: 'font',
            description: 'The text font ({size}px {font name})',
            type: ArgType.String,
            required: true,
            rest: false
        },
        {
            name: 'style',
            description: 'The style (color/gradient/pattern)',
            type: ArgType.String,
            required: true,
            rest: false
        },
        {
            name: 'x',
            description: 'The text start X coordinate',
            type: ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'y',
            description: 'The text start Y coordinate',
            type: ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'maxWidth',
            description: 'Maximum font width',
            type: ArgType.Number,
            required: false,
            rest: false
        },
        {
            name: 'multiline',
            description: 'Indicates if new lines should be allowed',
            type: ArgType.Boolean,
            required: false,
            rest: false
        },
        {
            name: 'wrap',
            description: 'Indicates how the text should be wrapped if it exceeds the maximum width',
            type: ArgType.Enum,
            enum: TextWrap,
            required: false,
            rest: false
        },
        {
            name: 'lineOffset',
            description: 'The text lines offset',
            type: ArgType.Number,
            required: false,
            rest: false
        },
        {
            name: 'newlineBeginning',
            description: 'The alignment of the text when a new line is encountered',
            type: ArgType.Enum,
            enum: TextAlign,
            required: false,
            rest: false,
            version: '1.3.0'
        },
        {
            name: 'allowEmojis',
            description: 'Indicates if custom emojis should be drawn',
            type: ArgType.Boolean,
            required: false,
            rest: false,
            version: '1.3.0'
        }
    ],
    async execute (ctx, [name, t, text, font, style, x, y, maxWidth, multiline, wrap, lineOffset, nlAlign, allowEmojis]) {
        const canvas = name
            ? ctx.canvasManager?.get(name)
            : ctx.canvasManager?.lastCurrent;
        if (!canvas) return this.customError(FCError.NoCanvas);

        const valid = CanvasUtil.validateFont(font);
        if (!valid || typeof valid === 'string') return this.customError(valid);

        const styleT = t === FillOrStroke.fill ? 'fillStyle' : 'strokeStyle',
              s = await CanvasUtil.resolveStyle(this, ctx, canvas, style);
        if (s instanceof Return) return s;

        canvas.ctx[styleT] = s;
        canvas.text(
            t,
            await CanvasUtil.parseText(
                ctx.client, text,
                multiline === true, allowEmojis
            ),
            x, y,
            font,
            typeof maxWidth === 'number' ? maxWidth : undefined,
            // @ts-expect-error
            TextAlign[wrap] !== undefined ? wrap : undefined,
            typeof lineOffset === 'number' ? lineOffset : undefined,
            // @ts-expect-error
            typeof nlAlign === 'number' ? TextAlign[nlAlign] : nlAlign
        );

        return this.success();
    }
});

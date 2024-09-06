import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { CanvasUtil, Context, FillOrStroke } from '../../';

export default new NativeFunction({
    name: '$drawText',
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
            description: 'The font text.',
            type: ArgType.String,
            check: (i: string) => CanvasUtil.isValidFont(i),
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
        },
    ],
    async execute (ctx: Context, [name, t, text, font, x, y, maxWidth, multiline, wrap, lineOffset]) {
        const canvas = name
            ? ctx.canvasManager?.get(name)
                : !name && ctx.canvasManager?.current?.length !== 0 
                    ? ctx.canvasManager?.current?.[ctx.canvasManager?.current?.length - 1] : null;
        
        if (!canvas)
            return this.customError('No canvas');

        console.log(t, text, font, x, y, maxWidth, multiline, wrap, lineOffset);
        canvas.text(
            t,
            text,
            x,
            y,
            font,
            maxWidth,
            multiline,
            wrap,
            lineOffset
        );
        return this.success();
    }
});
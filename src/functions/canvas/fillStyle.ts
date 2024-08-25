import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { CanvasUtil, Colors, Context, hexRegex, rgbaRegex, StyleType } from '../../';

export default new NativeFunction({
    name: '$fillStyle',
    description: 'Sets or returns the fill style in a canvas.',
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
            description: 'The style type.',
            type: ArgType.Enum,
            enum: StyleType,
            required: false,
            rest: false
        },
        {
            name: 'style',
            description: 'The style.',
            type: ArgType.String,
            required: false,
            rest: false
        }
    ],
    async execute (ctx: Context, [name, t, style]) {
        const canvas = name
            ? ctx.canvasManager?.get(name)
                : !name && ctx.canvasManager?.current?.length !== 0 
                    ? ctx.canvasManager?.current?.[ctx.canvasManager?.current?.length - 1] : null;
        
        if (!canvas)
            return this.customError('No canvas');

        if (!style)
            return this.success(canvas.ctx.fillStyle);

        if (t === StyleType.color)
            style = hexRegex.test(style) ? style 
                : (rgbaRegex.test(style) ? (() => {
                    const match = style.match(rgbaRegex) as RegExpMatchArray;
                    return CanvasUtil.rgbaToHex(
                        parseInt(match[1], 10),
                        parseInt(match[2], 10),
                        parseInt(match[3], 10),
                        match[5] ? parseFloat(match[5]) : undefined
                    );
                })() : Colors[style]);

        if (!style) return this.customError('Invalid style');

        canvas.ctx.fillStyle = style;
        return this.success();
    }
});
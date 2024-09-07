import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { Image, loadImage } from '@napi-rs/canvas';
import { CanvasUtil, Colors, Context, FillRule, hexRegex, rgbaRegex } from '../..';

export default new NativeFunction({
    name: '$fill',
    description: 'Fills the current path.',
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
            name: 'style',
            description: 'The style. (color/gradient/pattern)',
            type: ArgType.String,
            required: true,
            rest: false
        },
        {
            name: 'fillRule',
            description: 'The fill rule',
            type: ArgType.Enum,
            enum: FillRule,
            required: false,
            rest: false
        }
    ],
    async execute (ctx: Context, [name, style, rule]) {
        const canvas = name
            ? ctx.canvasManager?.get(name)
                : !name && ctx.canvasManager?.current?.length !== 0 
                    ? ctx.canvasManager?.current?.[ctx.canvasManager?.current?.length - 1] : null;
        
        if (!canvas)
            return this.customError('No canvas');

        let s: any = style.split(':');
        if (s[0] === 'gradient' && s[1] === '//') {
            const gradient = ctx.gradientManager?.get(s.slice(2).join(':'));
            if (!gradient) return this.customError('No gradient');

            s = gradient;
        } else if (s[0] === 'pattern' && s[1] === '//') {
            const splits = s.slice(2),
                  type = splits.shift()?.toLowerCase(),
                  repeat = splits.length > 0 && ['repeat', 'repeat-x', 'repeat-y', 'no-repeat'].includes(splits[splits.length - 1]) ? splits.pop() : null;
            let image: Image | ImageData;
        
            if (type === 'canvas') {
                const canvas_2 = ctx.canvasManager?.get(repeat ? splits.join(':') : splits.join())?.ctx;
        
                if (!canvas_2)
                    return this.customError('No canvas with provided name found. (pattern)');
        
                image = canvas_2.getImageData(0, 0, canvas_2.canvas.width, canvas_2.canvas.height);
            } else if (type === 'image')
                image = await loadImage(repeat ? splits.join(':') : splits.join(), { maxRedirects: 30 });
            else return this.customError('Invalid pattern type.');

            s = canvas.ctx.createPattern(image, repeat);
        } else {
            s = hexRegex.test(style) ? style 
                : (rgbaRegex.test(style) ? (() => {
                    const match = style.match(rgbaRegex) as RegExpMatchArray;
                    return CanvasUtil.rgbaToHex(
                        parseInt(match[1], 10),
                        parseInt(match[2], 10),
                        parseInt(match[3], 10),
                        match[5] ? parseFloat(match[5]) : undefined
                    );
                })() : Colors[style]);
        };

        const oldstyle = canvas.ctx.fillStyle;

        canvas.ctx.fillStyle = s;
        canvas.ctx.fill((typeof rule === 'number' ? FillRule[rule] : rule) as CanvasFillRule);
        canvas.ctx.fillStyle = oldstyle;

        return this.success();
    }
});
import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { Image, loadImage } from '@napi-rs/canvas';
import { CanvasUtil, Colors, Context, FillOrStrokeOrClear, hexRegex, rgbaRegex } from '../..';

export default new NativeFunction({
    name: '$drawRect',
    description: 'Draws a rectangle on a canvas.',
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
            description: 'The rectangle type.',
            type: ArgType.Enum,
            enum: FillOrStrokeOrClear,
            required: true,
            rest: false
        },
        {
            name: 'style',
            description: 'The style. (color/gradient/pattern)',
            type: ArgType.String,
            required: false,
            rest: false
        },
        {
            name: 'x',
            description: 'The rect start X coordinate.',
            type: ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'y',
            description: 'The rect start Y coordinate.',
            type: ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'width',
            description: 'The rect width.',
            type: ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'height',
            description: 'The rect height.',
            type: ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'radius',
            description: 'The rect radius.',
            type: ArgType.Number,
            required: false,
            rest: true
        }
    ],
    async execute (ctx: Context, [name, t, style, x, y, w, h, r]) {
        const canvas = name
            ? ctx.canvasManager?.get(name)
                : !name && ctx.canvasManager?.current?.length !== 0 
                    ? ctx.canvasManager?.current?.[ctx.canvasManager?.current?.length - 1] : null;
        
        if (!canvas)
            return this.customError('No canvas');

        if (!style && (t === FillOrStrokeOrClear.fill || t === FillOrStrokeOrClear.stroke))
            return this.customError('No style provided.');

        let s: any;
        if (style) {
            s = style.split('://');
            if (s[0] === 'gradient') {
                const gradient = ctx.gradientManager?.get(s.slice(1).join('://'));
                if (!gradient) return this.customError('No gradient');

                s = gradient;
            } else if (s[0] === 'pattern') {
                const splits = s.slice(1).join('://').split(':'),
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
        }

        const styleT = t === FillOrStrokeOrClear.fill ? 'fillStyle' : 'strokeStyle',
              oldstyle = canvas.ctx[styleT];

        canvas.ctx[styleT] = s ?? '#000000';
        canvas.rect(t, x, y, w, h, r.length === 1 ? r[0] : r);
        canvas.ctx[styleT] = oldstyle;

        return this.success();
    }
});
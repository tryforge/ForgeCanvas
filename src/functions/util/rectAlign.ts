import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { Context, RectAlign } from '../..';

export default new NativeFunction({
    name: '$rectAlign',
    aliases: ['$alignRect', '$alignImage', '$imageAlign'],
    description: 'Sets or returns the rect/image align.',
    version: '1.2.0',
    brackets: false,
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
            name: 'align',
            description: 'The new align.',
            type: ArgType.Enum,
            enum: RectAlign,
            required: false,
            rest: false
        }
    ],
    async execute (ctx: Context, [name, align]) {
        const canvas = name
            ? ctx.canvasManager?.get(name)
            : ctx.canvasManager?.lastCurrent;
        if (!canvas) return this.customError('No canvas');
 
        return this.success(align !== null
            ? (
                canvas.customProperties.rectAlign = (
                    typeof align === 'number' ? RectAlign[align] : align
                ) as unknown as RectAlign, undefined
            ) : typeof canvas.customProperties?.rectAlign === 'number'
                ? RectAlign[canvas.customProperties.rectAlign]
                : canvas.customProperties?.rectAlign ?? 'left'
        );
    }
});
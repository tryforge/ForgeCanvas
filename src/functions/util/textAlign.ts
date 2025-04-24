import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { TextAlign } from '../..';

export default new NativeFunction({
    name: '$textAlign',
    aliases: ['$alignText'],
    description: 'Sets or returns the text align.',
    version: '1.0.0',
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
            enum: TextAlign,
            required: false,
            rest: false
        }
    ],
    async execute (ctx, [name, align]) {
        const canvas = (name
            ? ctx.canvasManager?.get(name)
            : ctx.canvasManager?.lastCurrent)?.ctx;
        if (!canvas) return this.customError('No canvas');
 
        return this.success(align !== null
            ? (
                canvas.textAlign = (
                    typeof align === 'number' ? TextAlign[align] : align
                ) as CanvasTextAlign, undefined
            ) : typeof canvas.textAlign === 'number'
                ? TextAlign[canvas.textAlign]
                : canvas.textAlign ?? 'start'
        );
    }
});
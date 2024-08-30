import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { Context, TextAlign } from '../..';

export default new NativeFunction({
    name: '$textAlign',
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
    async execute (ctx: Context, [name, align]) {
        const canvas = name
            ? ctx.canvasManager?.get(name)?.ctx
                : !name && ctx.canvasManager?.current?.length !== 0 
                    ? ctx.canvasManager?.current?.[ctx.canvasManager?.current?.length - 1]?.ctx : null;
        
        if (!canvas)
            return this.customError('No canvas');
 
        return this.success(align
            ? (canvas.textAlign = (
                typeof align === 'number' ? TextAlign[align] : align) as CanvasTextAlign,
                undefined
            ) : TextAlign[canvas.textAlign]
        );
    }
});
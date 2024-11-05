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
                : !name && ctx.canvasManager?.current?.length !== 0 
                    ? ctx.canvasManager?.current?.[ctx.canvasManager?.current?.length - 1] : null;
        
        if (!canvas)
            return this.customError('No canvas');
 
        return this.success(align
            ? (
                canvas.customProperties.rectAlign = align,
                undefined
            ) : RectAlign[canvas.customProperties?.rectAlign ?? 'left']
        );
    }
});
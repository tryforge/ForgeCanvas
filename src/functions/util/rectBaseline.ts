import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { Context, RectBaseline } from '../..';

export default new NativeFunction({
    name: '$rectBaseline',
    aliases: ['$imageBaseline'],
    description: 'Sets or returns the rect/image baseline.',
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
            name: 'baseline',
            description: 'The new baseline.',
            type: ArgType.Enum,
            enum: RectBaseline,
            required: false,
            rest: false
        }
    ],
    async execute (ctx: Context, [name, baseline]) {
        const canvas = name
            ? ctx.canvasManager?.get(name)
                : !name && ctx.canvasManager?.current?.length !== 0 
                    ? ctx.canvasManager?.current?.[ctx.canvasManager?.current?.length - 1] : null;
        
        if (!canvas)
            return this.customError('No canvas');
 
        return this.success(baseline
            ? (
                canvas.customProperties.rectBaseline = baseline,
                undefined
            ) : RectBaseline[canvas.customProperties?.rectBaseline ?? 'bottom']
        );
    }
});
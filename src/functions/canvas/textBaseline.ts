import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { Context, TextBaseline } from '../..';

export default new NativeFunction({
    name: '$textBaseline',
    description: 'Sets or returns the text baseline.',
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
            enum: TextBaseline,
            required: false,
            rest: false
        }
    ],
    async execute (ctx: Context, [name, baseline]) {
        const canvas = name
            ? ctx.canvasManager?.get(name)?.ctx
                : !name && ctx.canvasManager?.current?.length !== 0 
                    ? ctx.canvasManager?.current?.[ctx.canvasManager?.current?.length - 1]?.ctx : null;
        
        if (!canvas)
            return this.customError('No canvas');
 
        return this.success(baseline
            ? (canvas.textBaseline = (
                typeof baseline === 'number' ? TextBaseline[baseline] : baseline) as CanvasTextBaseline,
                undefined
            ) : canvas.textBaseline
        );
    }
});
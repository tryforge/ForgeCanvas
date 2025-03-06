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
            : ctx.canvasManager?.lastCurrent;
        if (!canvas) return this.customError('No canvas');
 
        return this.success(baseline !== null
            ? (
                canvas.customProperties.rectBaseline = (
                    typeof baseline === 'number' ? RectBaseline[baseline] : baseline
                ) as unknown as RectBaseline, undefined
            ) : typeof canvas.customProperties?.rectBaseline === 'number'
                ? RectBaseline[canvas.customProperties.rectBaseline]
                : canvas.customProperties?.rectBaseline ?? 'bottom'
        );
    }
});
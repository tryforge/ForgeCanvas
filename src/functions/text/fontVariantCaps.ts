import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { Context, FontVariantCaps } from '../..';

export default new NativeFunction({
    name: '$fontVariantCaps',
    description: 'Sets or returns the capitalization of the text.',
    version: '1.1.0',
    aliases: ["$fontVarCaps"],
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
            name: 'type',
            description: 'The new alternative capitalization.',
            type: ArgType.Enum,
            enum: FontVariantCaps,
            required: false,
            rest: false
        }
    ],
    async execute (ctx: Context, [name, t]) {
        const canvas = (name
            ? ctx.canvasManager?.get(name)
                : !name && ctx.canvasManager?.current?.length !== 0 
                    ? ctx.canvasManager?.current?.[ctx.canvasManager?.current?.length - 1] : null)?.ctx;
        
        if (!canvas)
            return this.customError('No canvas');

        return this.success(t
            ? (canvas.fontVariantCaps = (typeof t === 'number' 
                ? FontVariantCaps[t]
                : t
            ) as CanvasFontVariantCaps, undefined) : canvas.fontVariantCaps
        );
    }
});
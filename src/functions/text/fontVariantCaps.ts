import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { FCError, FontVariantCaps } from '../..';

export default new NativeFunction({
    name: '$fontVariantCaps',
    aliases: ['$fontCaps'],
    description: 'Sets or returns the capitalization of the text.',
    version: '1.1.0',
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
    execute (ctx, [name, t]) {
        const canvas = (name
            ? ctx.canvasManager?.get(name)
            : ctx.canvasManager?.lastCurrent)?.ctx;
        if (!canvas) return this.customError(FCError.NoCanvas);

        return this.success(t !== null
            ? (canvas.fontVariantCaps = (typeof t === 'number' 
                ? FontVariantCaps[t]
                : t
            ) as CanvasFontVariantCaps, undefined) : canvas.fontVariantCaps
        );
    }
});
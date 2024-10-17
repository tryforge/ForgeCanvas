import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { Context } from '../..';

export default new NativeFunction({
    name: '$createGIF',
    description: 'Creates a new GIF.',
    version: '1.0.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'name',
            description: 'Name of the GIF to create.',
            type: ArgType.String,
            required: true,
            rest: false
        },
        {
            name: 'functions',
            description: 'Functions.',
            type: ArgType.Unknown,
            required: false,
            rest: true
        }
    ],
    async execute (ctx: Context, [name]) {
        if (!ctx.GIFManager || ctx.GIFManager.current.length === 0)
            return this.customError('No size has been set');

        const i = ctx.GIFManager.current.length - 1;

        ctx.GIFManager.set(name, ctx.GIFManager.current[i]);
        ctx.GIFManager.current = ctx.GIFManager.current.slice(0, i);

        return this.success();
    }
});
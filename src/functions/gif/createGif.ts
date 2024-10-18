import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { Context, GIFManager } from '../..';

export default new NativeFunction({
    name: '$createGIF',
    description: 'Creates a new GIF.',
    version: '1.2.0',
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
        if (!ctx.gifManager || ctx.gifManager?.current.length === 0)
            return this.customError('No size has been set');

        const i = ctx.gifManager?.current.length - 1;

        ctx.gifManager?.set(name, ctx.gifManager?.current[i]);
        ctx.gifManager.current = ctx.gifManager?.current.slice(0, i);

        return this.success();
    }
});
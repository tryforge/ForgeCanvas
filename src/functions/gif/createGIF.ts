import { ArgType, NativeFunction } from '@tryforge/forgescript';
import { Context, GIFManager } from '../..';

export default new NativeFunction({
    name: '$createGIF',
    aliases: ['$newGIF', '$gif'],
    description: 'Creates a gif.',
    version: '1.1.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'gif',
            description: 'Name of the new gif.',
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
        if (!ctx.gifManager || !(ctx.gifManager instanceof GIFManager))
            ctx.gifManager = new GIFManager();

        const i = ctx.gifManager.current.length - 1;

        ctx.gifManager.set(name, ctx.gifManager.current[i]);
        ctx.gifManager.current = ctx.gifManager.current.slice(0, i);

        return this.success();
    }
});
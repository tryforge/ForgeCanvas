import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { Context } from '../..';

export default new NativeFunction({
    name: '$newGIFEncoder',
    aliases: ['$createGIFEncoder', '$GIFEncoder', '$createEncoder', '$newEncoder'],
    description: 'Creates a new GIF Encoder.',
    version: '1.2.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'gif',
            description: 'Name of the new GIF Encoder.',
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
        if (!ctx.gifManager || ctx.gifManager.currentEncoder.length === 0)
            return this.customError('No size and palette has been set');

        const i = ctx.gifManager.currentEncoder.length - 1;

        ctx.gifManager.setEncoder(name, ctx.gifManager.currentEncoder[i]);
        ctx.gifManager.currentEncoder = ctx.gifManager.currentEncoder.slice(0, i);

        return this.success();
    }
});
import { NativeFunction, ArgType } from '@tryforge/forgescript';

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
    async execute (ctx, [name]) {
        if (!ctx.gifManager || ctx.gifManager.currentEncoder.length === 0)
            return this.customError('No size and palette has been set');

        ctx.gifManager.setEncoder(name, ctx.gifManager.lastCurrentEncoder);
        ctx.gifManager.currentEncoder = ctx.gifManager.currentEncoder.slice(0, ctx.gifManager.currentEncoder.length - 1);

        return this.success();
    }
});
import { NativeFunction, ArgType } from '@tryforge/forgescript';

export default new NativeFunction({
    name: '$deleteDecoder',
    aliases: ['$removeDecoder'],
    description: 'Deletes the Decoder.',
    version: '1.2.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'name',
            description: 'Name of the Decoder.',
            type: ArgType.String,
            required: true,
            rest: false
        }
    ],
    async execute (ctx, [name]) {
        ctx.gifManager?.removeDecoder(name);
        return this.success();
    }
});
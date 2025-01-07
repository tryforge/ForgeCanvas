import { ArgType, NativeFunction } from '@tryforge/forgescript';
import { Context, GIFManager } from '../..';
import { DecodeOptions } from '@gifsx/gifsx';

export default new NativeFunction({
    name: '$setMemoryLimit',
    aliases: ['$setRAMLimit'],
    description: 'Configure the memory limit for the GIF Decoder.',
    version: '1.2.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'name',
            description: 'Name of the Decode Options.',
            type: ArgType.String,
            required: false,
            rest: false
        },
        {
            name: 'limit',
            description: 'Memory limit in bytes.',
            type: ArgType.Number,
            required: true,
            rest: false
        }
    ],
    async execute (ctx: Context, [name, limit]) {
        if (!ctx.gifManager || !(ctx.gifManager instanceof GIFManager))
            ctx.gifManager = new GIFManager();
        if (!name && !ctx.gifManager.currentOptions)
            ctx.gifManager.currentOptions = new DecodeOptions();

        let options = name
            ? ctx.gifManager.getDecodeOptions(name)
            : ctx.gifManager.currentOptions;

        if (options) options.setMemoryLimit(limit);
        return this.success();
    }
});
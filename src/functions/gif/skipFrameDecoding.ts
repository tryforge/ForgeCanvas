import { ArgType, NativeFunction } from '@tryforge/forgescript';
import { Context, GIFManager } from '../..';
import { DecodeOptions } from '@gifsx/gifsx';

export default new NativeFunction({
    name: '$skipFrameDecoding',
    aliases: ['$skipFrameDecode'],
    description: 'Configure whether to skip decoding frames.',
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
            name: 'boolean',
            description: 'Whether to skip decoding frames.',
            type: ArgType.Boolean,
            required: true,
            rest: false
        }
    ],
    async execute (ctx: Context, [name, bool]) {
        if (!ctx.gifManager || !(ctx.gifManager instanceof GIFManager))
            ctx.gifManager = new GIFManager();
        if (!name && !ctx.gifManager.currentOptions)
            ctx.gifManager.currentOptions = new DecodeOptions();

        let options = name
            ? ctx.gifManager.getDecodeOptions(name)
            : ctx.gifManager.currentOptions;

        if (options) options.skipFrameDecoding(bool);
        return this.success();
    }
});
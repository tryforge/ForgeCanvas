import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { GIFManager } from '../..';
import { DecodeOptions } from '@gifsx/gifsx';

export default new NativeFunction({
    name: '$decodeOptions',
    aliases: ['$decoderOptions'],
    description: 'Creates new GIF Decode Options.',
    version: '1.2.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'name',
            description: 'Name of the new GIF Decode Options.',
            type: ArgType.String,
            required: true,
            rest: false
        },
        {
            name: 'options',
            description: 'Options.',
            type: ArgType.Unknown,
            required: false,
            rest: true
        }
    ],
    async execute (ctx, [name]) {
        if (!ctx.gifManager || !(ctx.gifManager instanceof GIFManager))
            ctx.gifManager = new GIFManager();

        if (ctx.gifManager.currentOptions) {
            ctx.gifManager.setDecodeOptions(name, ctx.gifManager.currentOptions);
            ctx.gifManager.currentOptions = null;
        } else ctx.gifManager.setDecodeOptions(name, new DecodeOptions());

        return this.success();
    }
});
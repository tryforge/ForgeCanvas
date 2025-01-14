import { ArgType, NativeFunction } from '@tryforge/forgescript';
import { Context, GIFManager } from '../..';
import { DecodeOptions } from '@gifsx/gifsx';

export default new NativeFunction({
    name: '$checkFrameConsistency',
    aliases: ['$checkFrame', '$frameConsistency'],
    description: 'Configure if frames must be within the screen descriptor.',
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
            description: 'If frames must be within the screen descriptor.',
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

        if (options) options.checkFrameConsistency(bool);
        return this.success();
    }
});
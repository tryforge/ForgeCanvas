import { ArgType, NativeFunction } from '@tryforge/forgescript';
import { GIFManager } from '../..';
import { DecodeOptions } from '@gifsx/gifsx';

export default new NativeFunction({
    name: '$checkLZWEndCode',
    description: 'Configure if LZW encoded blocks must end with a marker end code.',
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
            description: 'If LZW encoded blocks must end with a marker end code.',
            type: ArgType.Boolean,
            required: true,
            rest: false
        }
    ],
    async execute (ctx, [name, bool]) {
        if (!ctx.gifManager || !(ctx.gifManager instanceof GIFManager))
            ctx.gifManager = new GIFManager();
        if (!name && !ctx.gifManager.currentOptions)
            ctx.gifManager.currentOptions = new DecodeOptions();

        const options = name
            ? ctx.gifManager.getDecodeOptions(name)
            : ctx.gifManager.currentOptions;

        if (options) options.checkLzwEndCode(bool);
        return this.success();
    }
});
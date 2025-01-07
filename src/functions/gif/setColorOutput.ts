import { ArgType, NativeFunction } from '@tryforge/forgescript';
import { Context, GIFManager, ColorOutput } from '../..';
import { DecodeOptions } from '@gifsx/gifsx';

export default new NativeFunction({
    name: '$setColorOutput',
    aliases: ['$setOutputColor'],
    description: 'Configure the color output for the GIF Decoder.',
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
            name: 'output',
            description: 'The color output type.',
            type: ArgType.Enum,
            enum: ColorOutput,
            required: true,
            rest: false
        }
    ],
    async execute (ctx: Context, [name, output]) {
        if (!ctx.gifManager || !(ctx.gifManager instanceof GIFManager))
            ctx.gifManager = new GIFManager();
        if (!name && !ctx.gifManager.currentOptions)
            ctx.gifManager.currentOptions = new DecodeOptions();

        let options = name
            ? ctx.gifManager.getDecodeOptions(name)
            : ctx.gifManager.currentOptions;

        if (options) options.setColorOutput(output as unknown as import('@gifsx/gifsx').ColorOutput);
        return this.success();
    }
});
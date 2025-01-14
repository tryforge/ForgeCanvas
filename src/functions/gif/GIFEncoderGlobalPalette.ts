import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { Context } from '../..';

export default new NativeFunction({
    name: '$GIFEncoderGlobalPalette',
    aliases: ['$encoderGlobalPalette', '$globalPalette'],
    description: 'Gets the global palette of the GIF Encoder.',
    version: '1.2.0',
    brackets: false,
    unwrap: true,
    args: [
        {
            name: 'gif',
            description: 'Name of the GIF.',
            type: ArgType.String,
            required: false,
            rest: false
        }
    ],
    async execute (ctx: Context, [name]) {
        const gif = name
            ? ctx.gifManager?.getEncoder(name)
                : !name && ctx.gifManager?.currentEncoder?.length !== 0 
                    ? ctx.gifManager?.currentEncoder?.[ctx.gifManager?.currentEncoder?.length - 1] : null;
        
        if (!gif) return this.customError('No gif');
        return this.success(gif.palette !== null 
            ? `[${Array.from(gif.palette).join(', ')}]` : null
        );
    }
});
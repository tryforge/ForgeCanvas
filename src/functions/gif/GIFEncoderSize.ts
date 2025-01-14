import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { Context, WidthOrHeight } from '../..';

export default new NativeFunction({
    name: '$GIFEncoderSize',
    aliases: ['$encoderSize'],
    description: 'Returns the size of the GIF Encoder.',
    version: '1.2.0',
    brackets: false,
    unwrap: true,
    args: [
        {
            name: 'gif',
            description: 'Name of the Encoder.',
            type: ArgType.String,
            required: false,
            rest: false
        },
        {
            name: 'property',
            description: 'The size property to return.',
            type: ArgType.Enum,
            enum: WidthOrHeight,
            required: false,
            rest: false
        }
    ],
    async execute (ctx: Context, [name, property]) {
        const gif = name
            ? ctx.gifManager?.getEncoder(name)
                : !name && ctx.gifManager?.currentEncoder?.length !== 0 
                    ? ctx.gifManager?.currentEncoder?.[ctx.gifManager?.currentEncoder?.length - 1] : null;
        if (!gif) return this.customError('No gif');

        return this.success(property !== null // @ts-ignore
            ? gif[WidthOrHeight[
                (typeof property === 'string' ? WidthOrHeight[property] : property) as any
            ]]
            : JSON.stringify({ width: gif.width, height: gif.height })
        );
    }
}); 
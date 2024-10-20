import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { Context } from '../../';

export default new NativeFunction({
    name: '$setTransparent',
    description: 'Sets the transparent color of a gif.',
    version: '1.1.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'gif',
            description: 'Name of the GIF.',
            type: ArgType.String,
            required: false,
            rest: false
        },
        {
            name: 'color',
            description: 'The new transparency color.',
            type: ArgType.Color,
            required: true,
            rest: false
        }
    ],
    async execute(ctx: Context, [gifName, color]) {
        const gif = gifName
            ? ctx.gifManager?.get(gifName)
                : !gifName && ctx.gifManager?.current?.length !== 0 
                    ? ctx.gifManager?.current?.[ctx.gifManager?.current?.length - 1] : null;

        if (!gif)
            return this.customError('No GIF.');

        gif.setTransparent(color);
        return this.success();
    }
});
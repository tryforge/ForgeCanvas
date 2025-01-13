import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { Context } from '../..';

export default new NativeFunction({
    name: '$readNextFrame',
    description: 'Reads and saves the next frame (including the buffer) of the GIF Decoder into an env.',
    version: '1.2.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'gif',
            description: 'Name of the Decoder.',
            type: ArgType.String,
            required: true,
            rest: false
        },
        {
            name: 'env',
            description: 'Name of the env to save the frame info.',
            type: ArgType.String,
            required: true,
            rest: false
        }
    ],
    async execute (ctx: Context, [name, env]) {
        const gif = ctx.gifManager?.getDecoder(name);
        if (!gif) return this.customError('No gif');

        ctx.setEnvironmentKey(env, gif.readNextFrame());
        return this.success();
    }
});
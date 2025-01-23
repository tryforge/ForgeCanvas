import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { Context } from '../..';

export default new NativeFunction({
    name: '$nextFrameInfo',
    description: 'Reads and saves the next frame info (skipping the buffer) of the GIF Decoder into an env.',
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
            name: 'name',
            description: 'The frame name to save the info as.',
            type: ArgType.String,
            required: true,
            rest: false
        }
    ],
    async execute (ctx: Context, [name, f]) {
        const gif = ctx.gifManager?.getDecoder(name);
        if (!gif) return this.customError('No gif');

        const frame = gif.nextFrameInfo();
        if (frame) {
            ctx.gifManager?.setFrame(f, frame);
            return this.success(f);
        }

        ctx.gifManager?.removeFrame(f);
        return this.success();
    }
});
import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { FCError } from '../../classes';

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
            name: 'name',
            description: 'Name of the env to save the frame info.',
            type: ArgType.String,
            required: true,
            rest: false
        }
    ],
    execute (ctx, [name, f]) {
        const gif = ctx.gifManager?.getDecoder(name);
        if (!gif) return this.customError(FCError.NoDecoder);

        const frame = gif.readNextFrame();
        if (frame) {
            ctx.gifManager?.setFrame(f, frame);
            return this.success(f);
        }

        ctx.gifManager?.removeFrame(f);
        return this.success();
    }
});
import { NativeFunction, ArgType } from '@tryforge/forgescript';
const GIFEncoder = require("gif-encoder-2")
import { GIFManager, Context } from '../../';

export default new NativeFunction({
    name: '$setGIFSize',
    description: 'Sets the size of the new GIF.',
    version: '1.2.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'width',
            description: 'Width of the new GIF.',
            type: ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'height',
            description: 'Height of the new GIF.',
            type: ArgType.Number,
            required: true,
            rest: false
        }
    ],
    async execute(ctx: Context, [width, height]) {
        // Ensure GIFManager is properly initialized
        if (!ctx.gifManager || !(ctx.gifManager instanceof GIFManager)) {
            ctx.gifManager = new GIFManager();
        }

        // Create a new GIFEncoder with the specified dimensions
        const gif = new GIFEncoder(width, height);
        gif.start(); // Start the GIF encoding process

        // Ensure ctx.gifManager.current is an array before pushing the new GIFEncoder instance
        if (!Array.isArray(ctx.gifManager.current)) {
            ctx.gifManager.current = [];
        }
        ctx.gifManager.current.push(gif);

        return this.success();
    }
});
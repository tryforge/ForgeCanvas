import { ArgType, NativeFunction } from '@tryforge/forgescript';
import { GIFManager, Context } from '../..';

export default new NativeFunction({
    name: '$setGIFSize',
    description: 'Sets size of the new gif.',
    version: '1.2.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'width',
            description: 'Width of the new gif.',
            type: ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'height',
            description: 'Height of the new gif.',
            type: ArgType.Number,
            required: true,
            rest: false
        }
    ],
    async execute (ctx: Context, [w, h]) {
        if (!ctx.gifManager || !(ctx.gifManager instanceof GIFManager))
            ctx.gifManager = new GIFManager();

        ctx.gifManager.current.push(w, h);
        return this.success();
    }
});
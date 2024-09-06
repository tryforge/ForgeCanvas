import { ArgType, NativeFunction } from '@tryforge/forgescript';
import { CanvasBuilder, CanvasManager, Context } from '../../';

export default new NativeFunction({
    name: '$setCanvasSize',
    description: 'Sets size of the new canvas.',
    version: '1.0.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'width',
            description: 'Width of the new canvas.',
            type: ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'height',
            description: 'Height of the new canvas.',
            type: ArgType.Number,
            required: true,
            rest: false
        }
    ],
    async execute (ctx: Context, [w, h]) {
        if (!ctx.canvasManager || !(ctx.canvasManager instanceof CanvasManager))
            ctx.canvasManager = new CanvasManager();

        ctx.canvasManager.current.push(new CanvasBuilder(w, h));
        return this.success();
    }
});
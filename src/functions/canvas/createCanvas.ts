import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { CanvasBuilder, CanvasManager, FCError } from '../../classes';

export default new NativeFunction({
    name: '$createCanvas',
    aliases: ['$newCanvas', '$canvas'],
    description: 'Creates a new canvas.',
    version: '1.0.0',
    brackets: true,
    unwrap: false,
    args: [
        {
            name: 'canvas',
            description: 'Name of the new canvas.',
            type: ArgType.String,
            required: true,
            rest: false
        },
        {
            name: 'width',
            description: 'Width of the canvas.',
            type: ArgType.Number,
            required: true,
            rest: false,
        },
        {
            name: 'height',
            description: 'Height of the canvas.',
            type: ArgType.Number,
            required: true,
            rest: false,
        },
        {
            name: 'functions',
            description: 'Functions.',
            type: ArgType.Unknown,
            required: false,
            rest: true
        }
    ],
    async execute (ctx) {
        if (!this.data.fields) this.data.fields = [];
        const name = (await this['resolveCode'](ctx, this.data.fields[0]))?.value;

        if (this.data.fields.length >= 3) {
            const width = Number((await this['resolveCode'](ctx, this.data.fields?.[1]))?.value);
            const height = Number((await this['resolveCode'](ctx, this.data.fields?.[2]))?.value);

            if (!Number.isNaN(width) && !Number.isNaN(height)) {
                if (!ctx.canvasManager || !(ctx.canvasManager instanceof CanvasManager))
                    ctx.canvasManager = new CanvasManager();

                ctx.canvasManager.current.push(new CanvasBuilder(
                    width, height
                ));
            }
        }

        for (let i = (this.data.fields.length >= 3 ? 3 : 1); i < this.data.fields.length; i++) {
            await this['resolveCode'](ctx, this.data.fields[i]);
        }

        if (!ctx.canvasManager || ctx.canvasManager.current.length === 0)
            return this.customError(FCError.NoSize);

        ctx.canvasManager.set(name, ctx.canvasManager.lastCurrent);
        ctx.canvasManager.current = ctx.canvasManager.current.slice(
            0, ctx.canvasManager.current.length - 1
        );

        return this.success();
    }
});
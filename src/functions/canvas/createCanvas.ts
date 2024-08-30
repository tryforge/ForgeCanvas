import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { Context } from '../..';

export default new NativeFunction({
    name: '$createCanvas',
    description: 'Creates a new canvas.',
    version: '1.0.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'canvas',
            description: 'Name of the new canvas.',
            type: ArgType.String,
            required: true,
            rest: false
        },
        {
            name: 'functions',
            description: 'Functions.',
            type: ArgType.Unknown,
            required: false,
            rest: true
        }
    ],
    async execute (ctx: Context, [name]) {
        if (!ctx.canvasManager || ctx.canvasManager.current.length === 0)
            return this.customError('No size has been set');

        const i = ctx.canvasManager.current.length - 1;

        ctx.canvasManager.set(name, ctx.canvasManager.current[i]);
        ctx.canvasManager.current = ctx.canvasManager.current.slice(0, i);

        return this.success();
    }
});
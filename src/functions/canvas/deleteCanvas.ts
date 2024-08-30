import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { Context } from '../../';

export default new NativeFunction({
    name: '$deleteCanvas',
    description: 'Deletes the canvas.',
    version: '1.0.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'name',
            description: 'Name of the canvas.',
            type: ArgType.String,
            required: true,
            rest: false
        }
    ],
    async execute (ctx: Context, [name]) {
        ctx.canvasManager?.remove(name);
        return this.success();
    }
});
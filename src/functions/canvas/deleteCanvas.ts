import { NativeFunction, ArgType } from '@tryforge/forgescript';

export default new NativeFunction({
    name: '$deleteCanvas',
    aliases: ['$removeCanvas'],
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
    execute (ctx, [name]) {
        ctx.canvasManager?.remove(name);
        return this.success();
    }
});
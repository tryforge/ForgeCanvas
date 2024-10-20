import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { Context } from '../..';

export default new NativeFunction({
    name: '$deleteGIF',
    description: 'Deletes the GIF.',
    version: '1.2.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'name',
            description: 'Name of the gif.',
            type: ArgType.String,
            required: true,
            rest: false
        }
    ],
    async execute (ctx: Context, [name]) {
        ctx.gifManager?.remove(name);
        return this.success();
    }
});
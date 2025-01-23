import { ArgType, NativeFunction } from '@tryforge/forgescript';
import { Context } from '../..';

export default new NativeFunction({
    name: '$NQlookup',
    description: 'Lookup pixel values for color at idx in the colormap.',
    version: '1.2.1',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'name',
            description: 'Name of the NeuQuant instance.',
            type: ArgType.String,
            required: true,
            rest: false
        },
        {
            name: 'idx',
            description: 'The index of the color in the colormap.',
            type: ArgType.Number,
            required: true,
            rest: false
        }
    ],
    async execute (ctx: Context, [name, idx]) {
        const nq = ctx.neuquantManager?.get(name);
        if (!nq) return this.customError('No NeuQuant instance');

        return this.success(nq.lookup(idx));
    }
});
import { ArgType, NativeFunction } from '@tryforge/forgescript';
import { FCError } from '../../classes';

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
    execute (ctx, [name, idx]) {
        const nq = ctx.neuquantManager?.get(name);
        if (!nq) return this.customError(FCError.NoNeuQuant);

        return this.success(nq.lookup(idx));
    }
});
import { ArgType, NativeFunction } from '@tryforge/forgescript';
import { FCError } from '../../classes';

export default new NativeFunction({
    name: '$NQindexOf',
    description: 'Finds the best-matching index in the color map.',
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
            name: 'r',
            description: 'The red value.',
            type: ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'g',
            description: 'The green value.',
            type: ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'b',
            description: 'The blue value.',
            type: ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'a',
            description: 'The alpha value.',
            type: ArgType.Number,
            required: true,
            rest: false
        }
    ],
    execute (ctx, [name, r, g, b, a]) {
        const nq = ctx.neuquantManager?.get(name);
        if (!nq) return this.customError(FCError.NoNeuQuant);

        return this.success(nq.indexOf(Uint8Array.from([r, g, b, a])));
    }
});
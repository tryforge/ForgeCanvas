import { ArgType, NativeFunction } from '@tryforge/forgescript';
import { NeuQuant } from '@gifsx/gifsx';
import { NeuQuantManager } from '../..';

export default new NativeFunction({
    name: '$newNeuQuant',
    aliases: ['$createNeuQuant', '$NeuQuant'],
    description: 'Creates a new NeuQuant instance.',
    version: '1.2.1',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'name',
            description: 'Name of the new NeuQuant instance.',
            type: ArgType.String,
            required: true,
            rest: false
        },
        {
            name: 'sample',
            description: 'Sample factor.',
            type: ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'maxColors',
            description: 'Maximum number of colors.',
            type: ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'pixels',
            description: 'The pixels.',
            type: ArgType.Json,
            required: true,
            rest: false
        }
    ],
    execute (ctx, [name, sample, maxColors, pixels]) {
        if (!ctx.neuquantManager || !(ctx.neuquantManager instanceof NeuQuantManager))
            ctx.neuquantManager = new NeuQuantManager();

        ctx.neuquantManager.set(
            name,
            new NeuQuant(
                sample, maxColors,
                Uint8Array.from(pixels as unknown as number[])
            )
        );
        return this.success();
    }
});
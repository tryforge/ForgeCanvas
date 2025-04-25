import { ArgType, NativeFunction } from '@tryforge/forgescript';
import { FCError } from '../../classes';

export default new NativeFunction({
    name: '$colorMapRgba',
    aliases: ['$NQcolorMapRgba'],
    description: 'Returns the RGBA color map calculated from the sample.',
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
        }
    ],
    execute (ctx, [name]) {
        const nq = ctx.neuquantManager?.get(name);
        if (!nq) return this.customError(FCError.NoNeuQuant);

        return this.success(nq.colorMapRgba());
    }
});
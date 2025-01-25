import { ArgType, NativeFunction } from '@tryforge/forgescript';
import { Context } from '../..';

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
    async execute (ctx: Context, [name]) {
        const nq = ctx.neuquantManager?.get(name);
        if (!nq) return this.customError('No NeuQuant instance');

        return this.success(nq.colorMapRgba());
    }
});
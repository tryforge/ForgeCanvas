import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { Context } from '../../';

export default new NativeFunction({
    name: '$translate',
    description: 'Adds a translation transformation.',
    version: '1.0.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'canvas',
            description: 'Name of the canvas.',
            type: ArgType.String,
            required: false,
            rest: false
        },
        {
            name: 'x',
            description: 'Distance to move in the horizontal direction.',
            type: ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'y',
            description: 'Distance to move in the vertical direction.',
            type: ArgType.Number,
            required: true,
            rest: false
        }
    ],
    async execute (ctx: Context, [name, x, y]) {
        const canvas = name
            ? ctx.canvasManager?.get(name)
                : !name && ctx.canvasManager?.current?.length !== 0 
                    ? ctx.canvasManager?.current?.[ctx.canvasManager?.current?.length - 1] : null;
        
        if (!canvas)
            return this.customError('No canvas');

        canvas.ctx.translate(x, y);
        return this.success();
    }
});
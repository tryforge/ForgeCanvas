import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { Context } from '../../';

export default new NativeFunction({
    name: '$lineDashOffset',
    description: 'Sets or returns the line dash offset in a canvas.',
    version: '1.0.0',
    brackets: false,
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
            name: 'offset',
            description: 'The new offset.',
            type: ArgType.Number,
            required: false,
            rest: false
        }
    ],
    async execute (ctx: Context, [name, offset]) {
        const canvas = (name
            ? ctx.canvasManager?.get(name)
                : !name && ctx.canvasManager?.current?.length !== 0 
                    ? ctx.canvasManager?.current?.[ctx.canvasManager?.current?.length - 1] : null)?.ctx;
        
        if (!canvas)
            return this.customError('No canvas');

        return this.success(offset
            ? (canvas.lineDashOffset = offset, undefined)
            : canvas.lineDashOffset
        );
    }
});
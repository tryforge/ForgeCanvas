import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { Context } from '../..';

export default new NativeFunction({
    name: '$rotate',
    description: 'Rotates a canvas.',
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
            name: 'angle',
            description: 'The rotation angle.',
            type: ArgType.Number,
            required: true,
            rest: false
        }
    ],
    async execute (ctx: Context, [name, angle]) {
        const canvas = name
            ? ctx.canvasManager?.get(name)
                : !name && ctx.canvasManager?.current?.length !== 0 
                    ? ctx.canvasManager?.current?.[ctx.canvasManager?.current?.length - 1] : null;
        
        if (!canvas)
            return this.customError('No canvas');

        canvas.rotate(angle);
        return this.success();
    }
});
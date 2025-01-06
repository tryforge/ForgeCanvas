import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { Context } from '../..';

export default new NativeFunction({
    name: '$beginPath',
    aliases: ['$startPath', '$pathStart'],
    description: 'Begins a new path.',
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
        }
    ],
    async execute (ctx: Context, [name]) {
        const canvas = (name
            ? ctx.canvasManager?.get(name)
                : !name && ctx.canvasManager?.current?.length !== 0 
                    ? ctx.canvasManager?.current?.[ctx.canvasManager?.current?.length - 1] : null)?.ctx;
        
        if (!canvas)
            return this.customError('No canvas');

        canvas.beginPath();
        return this.success();
    }
});
import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { Context } from '../..';
import { writeFileSync } from 'node:fs';

export default new NativeFunction({
    name: '$downloadCanvas',
    description: 'Downloads a canvas.',
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
            name: 'path',
            description: 'Path to a directory. (including the canvas file name and extension)',
            type: ArgType.String,
            required: true,
            rest: false
        }
    ],
    async execute (ctx: Context, [name, path]) {
        const canvas = name
            ? ctx.canvasManager?.get(name)
                : !name && ctx.canvasManager?.current?.length !== 0 
                    ? ctx.canvasManager?.current?.[ctx.canvasManager?.current?.length - 1] : null;
        
        if (!canvas)
            return this.customError('No canvas');

        if (!path) return this.customError('No path provided.');

        writeFileSync(path, canvas.buffer);
        return this.success();
    }
});
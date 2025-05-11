import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { FCError } from '../../classes';

export default new NativeFunction({
    name: '$transform',
    description: 'Multiplies the current transformation.',
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
            name: 'a',
            description: 'The cell in the first row and first column of the matrix.',
            type: ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'b',
            description: 'The cell in the second row and first column of the matrix.',
            type: ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'c',
            description: 'The cell in the first row and second column of the matrix.',
            type: ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'd',
            description: 'The cell in the second row and second column of the matrix.',
            type: ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'e',
            description: 'The cell in the first row and third column of the matrix.',
            type: ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'f',
            description: 'The cell in the second row and third column of the matrix.',
            type: ArgType.Number,
            required: true,
            rest: false
        }
    ],
    execute (ctx, [name, ...matrix]) {
        const canvas = name
            ? ctx.canvasManager?.get(name)
            : ctx.canvasManager?.lastCurrent;
        if (!canvas) return this.customError(FCError.NoCanvas);

        canvas.ctx.transform(...matrix);
        return this.success();
    }
});
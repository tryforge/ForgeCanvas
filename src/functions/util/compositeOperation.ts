import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { Context, CompositingOperation } from '../..';

export default new NativeFunction({
    name: '$compositeOperation',
    description: 'Sets or returns the compositing operation in a canvas.',
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
            name: 'operation',
            description: 'The new compositing operation.',
            type: ArgType.Enum,
            enum: CompositingOperation,
            required: false,
            rest: false
        }
    ],
    async execute (ctx: Context, [name, operation]) {
        const canvas = (name
            ? ctx.canvasManager?.get(name)
                : !name && ctx.canvasManager?.current?.length !== 0 
                    ? ctx.canvasManager?.current?.[ctx.canvasManager?.current?.length - 1] : null)?.ctx;
        
        if (!canvas)
            return this.customError('No canvas');

        return this.success(operation
            ? (canvas.globalCompositeOperation = (typeof operation === 'number' 
                ? CompositingOperation[operation]
                : operation
            ) as GlobalCompositeOperation, undefined) : canvas.globalCompositeOperation
        );
    }
});
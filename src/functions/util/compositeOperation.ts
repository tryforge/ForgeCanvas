import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { CompositingOperation, FCError } from '../..';

export default new NativeFunction({
    name: '$compositeOperation',
    aliases: ['$compositingOperation', '$globalCompositingOperation', '$globalCompositeOperation'],
    description: 'Sets or returns the compositing operation in a canvas.',
    version: '1.1.0',
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
    execute (ctx, [name, operation]) {
        const canvas = (name
            ? ctx.canvasManager?.get(name)
            : ctx.canvasManager?.lastCurrent)?.ctx;
        if (!canvas) return this.customError(FCError.NoCanvas);

        return this.success(operation !== null
            ? (canvas.globalCompositeOperation = (typeof operation === 'number' 
                ? CompositingOperation[operation]
                : operation
            ) as GlobalCompositeOperation, undefined) : canvas.globalCompositeOperation
        );
    }
});
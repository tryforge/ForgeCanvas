import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { FCError, WidthOrHeight } from '../..';

export default new NativeFunction({
    name: '$canvasSize',
    aliases: ['$canvasDimensions'],
    description: 'Returns canvas size.',
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
            name: 'property',
            description: 'The size property to return.',
            type: ArgType.Enum,
            enum: WidthOrHeight,
            required: false,
            rest: false
        }
    ],
    execute (ctx, [name, property]) {
        const canvas = name
            ? ctx.canvasManager?.get(name)
            : ctx.canvasManager?.lastCurrent;
        if (!canvas) return this.customError(FCError.NoCanvas);

        return this.success(property !== null // @ts-ignore
            ? canvas[WidthOrHeight[
                (typeof property === 'string' ? WidthOrHeight[property] : property) as any
            ]]
            : JSON.stringify({ width: canvas.width, height: canvas.height })
        );
    }
}); 
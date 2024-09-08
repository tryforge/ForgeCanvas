import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { Context, WidthOrHeight } from '../..';

export default new NativeFunction({
    name: '$canvasSize',
    description: 'Returns canvas size.',
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
            name: 'property',
            description: 'The size property to return.',
            type: ArgType.Enum,
            enum: WidthOrHeight,
            required: false,
            rest: false
        }
    ],
    async execute (ctx: Context, [name, property]) {
        const canvas = name
            ? ctx.canvasManager?.get(name)
                : !name && ctx.canvasManager?.current?.length !== 0 
                    ? ctx.canvasManager?.current?.[ctx.canvasManager?.current?.length - 1] : null;
        
        if (!canvas)
            return this.customError('No canvas');

        return this.success(property // @ts-ignore
            ? canvas[WidthOrHeight[
                (typeof property === 'number' ? WidthOrHeight[property] : property) as any
            ]]
            : JSON.stringify({ width: canvas.width, height: canvas.height })
        );
    }
}); 
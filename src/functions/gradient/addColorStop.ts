import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { FCError, GradientManager } from '../..';

export default new NativeFunction({
    name: '$addColorStop',
    aliases: ['$colorStop'],
    description: 'Adds a color stop to the gradient.',
    version: '1.0.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'name',
            description: 'Name of the gradient.',
            type: ArgType.String,
            required: false,
            rest: false
        },
        {
            name: 'offset',
            description: 'The color stop offset.',
            type: ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'color',
            description: 'Color of the stop.',
            type: ArgType.String,
            required: true,
            rest: false
        }
    ],
    execute (ctx, [name, offset, color]) {
        if (!(offset / 100 >= 0 && offset / 100 <= 1))
            return this.customError(FCError.InvalidOffset);
        
        if (!ctx.gradientManager || !(ctx.gradientManager instanceof GradientManager))
            ctx.gradientManager = new GradientManager();

        const gradient = ctx.gradientManager?.get(name as string);
        if (name && !gradient) return this.customError(FCError.NoGradient);

        if (gradient)
            gradient.addColorStop(offset, color);
        else
            ctx.gradientManager.stops.push([offset, color]);

        return this.success();
    }
});
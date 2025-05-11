import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { GradientManager, GradientType } from '../..';

export default new NativeFunction({
    name: '$newConicGradient',
    aliases: ['$createConicGradient', '$conicGradient'],
    description: 'Creates a conic gradient.',
    version: '1.0.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'name',
            description: 'Name of the new gradient.',
            type: ArgType.String,
            required: true,
            rest: false
        },
        {
            name: 'start',
            description: 'The angle at which to begin the gradient, in radians. The angle starts from a line going horizontally right from the center, and proceeds clockwise.',
            type: ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'x',
            description: 'The X coordinate of the center of the gradient.',
            type: ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'y',
            description: 'The Y coordinate of the center of the gradient.',
            type: ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'stops',
            description: 'Color stops.',
            type: ArgType.Number,
            required: false,
            rest: true
        }
    ],
    execute (ctx, [name, sAngle, x, y]) {
        if (!ctx.gradientManager || !(ctx.gradientManager instanceof GradientManager))
            ctx.gradientManager = new GradientManager();

        ctx.gradientManager.set(name, GradientType.conic, sAngle, x, y);
        for (const stop of ctx.gradientManager.stops)
            ctx.gradientManager?.get(name)?.addColorStop(...stop);
        
        ctx.gradientManager.stops = [];
        return this.success();
    }
});
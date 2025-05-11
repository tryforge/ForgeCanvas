import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { GradientManager, GradientType } from '../..';

export default new NativeFunction({
    name: '$newRadialGradient',
    aliases: ['$createRadialGradient', '$radialGradient'],
    description: 'Creates a radial gradient.',
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
            name: 'x1',
            description: 'The X coordinate of the start circle.',
            type: ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'y1',
            description: 'The Y coordinate of the start circle.',
            type: ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'r1',
            description: 'The radius of the start circle.',
            type: ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'x2',
            description: 'The X coordinate of the end circle.',
            type: ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'y2',
            description: 'The Y coordinate of the end circle.',
            type: ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'r2',
            description: 'The radius of the end circle.',
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
    execute (ctx, [name, x1, y1, r1, x2, y2, r2]) {
        if (!ctx.gradientManager || !(ctx.gradientManager instanceof GradientManager))
            ctx.gradientManager = new GradientManager();

        ctx.gradientManager.set(name, GradientType.radial, x1, y1, r1, x2, y2, r2);
        for (const stop of ctx.gradientManager.stops)
            ctx.gradientManager?.get(name)?.addColorStop(...stop);
        
        ctx.gradientManager.stops = [];
        return this.success();
    }
});
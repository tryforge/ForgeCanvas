import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { FillRule } from '../..';

export default new NativeFunction({
    name: '$clip',
    aliases: ['$clipCanvas', '$canvasClip'],
    description: 'Turns the current path into the current clipping region.',
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
            name: 'fillRule',
            description: 'The fill rule',
            type: ArgType.Enum,
            enum: FillRule,
            required: false,
            rest: false
        }
    ],
    async execute (ctx, [name, rule]) {
        const canvas = name
            ? ctx.canvasManager?.get(name)
            : ctx.canvasManager?.lastCurrent;
        if (!canvas) return this.customError('No canvas');

        canvas.ctx.clip((typeof rule === 'number' ? FillRule[rule] : rule) as CanvasFillRule);
        return this.success();
    }
});
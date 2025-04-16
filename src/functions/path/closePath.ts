import { NativeFunction, ArgType } from '@tryforge/forgescript';

export default new NativeFunction({
    name: '$closePath',
    aliases: ['$endPath'],
    description: 'Adds a straight line from the current point to the start of the current path.',
    version: '1.0.0',
    unwrap: true,
    args: [
        {
            name: 'canvas',
            description: 'Name of the canvas.',
            type: ArgType.String,
            required: false,
            rest: false
        }
    ],
    async execute (ctx, [name]) {
        const canvas = name
            ? ctx.canvasManager?.get(name)
            : ctx.canvasManager?.lastCurrent;
        if (!canvas) return this.customError('No canvas');

        canvas.ctx.beginPath();
        return this.success();
    }
});
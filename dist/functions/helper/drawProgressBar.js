"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("../..");
exports.default = new forgescript_1.NativeFunction({
    name: '$drawProgressBar',
    description: 'Draws a progress bar.',
    version: '1.2.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'canvas',
            description: 'Name of the canvas.',
            type: forgescript_1.ArgType.String,
            required: false,
            rest: false
        },
        {
            name: 'progress',
            description: 'The progress. (percentages)',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'x',
            description: 'The X coordinate.',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'y',
            description: 'The Y coordinate.',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'width',
            description: 'The width.',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'height',
            description: 'The height.',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'options',
            description: 'The progress bar configuration.',
            type: forgescript_1.ArgType.Json,
            required: true,
            rest: false
        },
    ],
    async execute(ctx, [name, progress, x, y, width, height, options]) {
        const canvas = name
            ? ctx.canvasManager?.get(name)
            : !name && ctx.canvasManager?.current?.length !== 0
                ? ctx.canvasManager?.current?.[ctx.canvasManager?.current?.length - 1] : null;
        if (!canvas)
            return this.customError('No canvas');
        if (options.style)
            options.style = await __1.CanvasUtil.parseStyle(this, ctx, canvas, options.style) ?? '#000000';
        if (options.left)
            options.left = await __1.CanvasUtil.parseStyle(this, ctx, canvas, options.left) ?? '#000000';
        if (options.background.style) // @ts-ignore
            options.background.style = await __1.CanvasUtil.parseStyle(this, ctx, canvas, options.background.style) ?? '#000000';
        return this.success(JSON.stringify(canvas.drawProgressBar(x, y, width, height, progress, options ?? undefined)));
    }
});
//# sourceMappingURL=drawProgressBar.js.map
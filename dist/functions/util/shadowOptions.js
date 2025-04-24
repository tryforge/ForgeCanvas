"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: '$shadowOptions',
    aliases: ['$shadowConfig'],
    description: 'Sets or returns the shadow options in a canvas.',
    version: '1.1.0',
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
            name: 'options',
            description: 'The options.',
            type: forgescript_1.ArgType.Json,
            required: true,
            rest: false
        }
    ],
    async execute(ctx, [name, options]) {
        const canvas = (name
            ? ctx.canvasManager?.get(name)
            : ctx.canvasManager?.lastCurrent)?.ctx;
        if (!canvas)
            return this.customError('No canvas');
        if (typeof options === 'string')
            options = JSON.parse(options);
        const shadowOptions = {
            color: 'shadowColor',
            blur: 'shadowBlur',
            offsetX: 'shadowOffsetX',
            offsetY: 'shadowOffsetY'
        };
        const res = [];
        if (!Array.isArray(options)) {
            for (const option in options) // @ts-ignore
                canvas[shadowOptions?.[option]] = options[option];
        }
        else
            for (const option in options)
                res.push(canvas[shadowOptions[option]]);
        return this.success(Array.isArray(options) ? JSON.stringify(res) : undefined);
    }
});

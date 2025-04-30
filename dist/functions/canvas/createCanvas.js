"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const classes_1 = require("../../classes");
exports.default = new forgescript_1.NativeFunction({
    name: '$createCanvas',
    aliases: ['$newCanvas', '$canvas'],
    description: 'Creates a new canvas.',
    version: '1.0.0',
    brackets: true,
    unwrap: false,
    args: [
        {
            name: 'canvas',
            description: 'Name of the new canvas.',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false
        },
        {
            name: 'width',
            description: 'Width of the canvas.',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false,
        },
        {
            name: 'height',
            description: 'Height of the canvas.',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false,
        },
        {
            name: 'functions',
            description: 'Functions.',
            type: forgescript_1.ArgType.Unknown,
            required: false,
            rest: true
        }
    ],
    async execute(ctx) {
        if (!this.data.fields)
            this.data.fields = [];
        if (!ctx.canvasManager || !(ctx.canvasManager instanceof classes_1.CanvasManager))
            ctx.canvasManager = new classes_1.CanvasManager();
        const options = await this['resolveMultipleArgs'](ctx, 0, 1, 2);
        const [name, width, height] = options.args;
        const r = options.return;
        if (!r?.success)
            return r;
        ctx.canvasManager.current.push(new classes_1.CanvasBuilder(width, height));
        for (let i = 3; i < this.data.fields.length; i++) {
            const r = await this['resolveCode'](ctx, this.data.fields[i]);
            if (!r?.success)
                return r;
        }
        ctx.canvasManager.set(name, ctx.canvasManager.lastCurrent);
        ctx.canvasManager.current = ctx.canvasManager.current.slice(0, ctx.canvasManager.current.length - 1);
        return this.success();
    }
});

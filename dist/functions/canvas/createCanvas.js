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
        const name = (await this['resolveCode'](ctx, this.data.fields[0]))?.value;
        if (this.data.fields.length >= 3) {
            const width = Number((await this['resolveCode'](ctx, this.data.fields?.[1]))?.value);
            const height = Number((await this['resolveCode'](ctx, this.data.fields?.[2]))?.value);
            if (!Number.isNaN(width) && !Number.isNaN(height)) {
                if (!ctx.canvasManager || !(ctx.canvasManager instanceof classes_1.CanvasManager))
                    ctx.canvasManager = new classes_1.CanvasManager();
                ctx.canvasManager.current.push(new classes_1.CanvasBuilder(width, height));
            }
        }
        for (let i = (this.data.fields.length >= 3 ? 3 : 1); i < this.data.fields.length; i++) {
            await this['resolveCode'](ctx, this.data.fields[i]);
        }
        if (!ctx.canvasManager || ctx.canvasManager.current.length === 0)
            return this.customError(classes_1.FCError.NoSize);
        ctx.canvasManager.set(name, ctx.canvasManager.lastCurrent);
        ctx.canvasManager.current = ctx.canvasManager.current.slice(0, ctx.canvasManager.current.length - 1);
        return this.success();
    }
});

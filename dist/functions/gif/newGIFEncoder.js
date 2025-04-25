"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const classes_1 = require("../../classes");
const gifsx_1 = require("@gifsx/gifsx");
exports.default = new forgescript_1.NativeFunction({
    name: '$newGIFEncoder',
    aliases: ['$createGIFEncoder', '$GIFEncoder', '$createEncoder', '$newEncoder'],
    description: 'Creates a new GIF Encoder.',
    version: '1.2.0',
    brackets: true,
    unwrap: false,
    args: [
        {
            name: 'gif',
            description: 'Name of the new GIF Encoder.',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false
        },
        {
            name: 'width',
            description: 'Width of the new canvas.',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'height',
            description: 'Height of the new canvas.',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'palette',
            description: 'Palette for the GIF.',
            type: forgescript_1.ArgType.Json,
            required: false,
            rest: false
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
        if (this.data.fields.length >= 4) {
            const width = Number((await this['resolveCode'](ctx, this.data.fields[1]))?.value);
            const height = Number((await this['resolveCode'](ctx, this.data.fields[2]))?.value);
            let palette = (await this['resolveCode'](ctx, this.data.fields[2]))?.value;
            try {
                palette = JSON.parse(palette);
            }
            catch (_) { }
            ;
            if (!Number.isNaN(width) && !Number.isNaN(height)) {
                if (!ctx.gifManager || !(ctx.gifManager instanceof classes_1.GIFManager))
                    ctx.gifManager = new classes_1.GIFManager();
                ctx.gifManager.currentEncoder.push(new gifsx_1.Encoder(width, height, Array.isArray(palette) ? Uint8Array.from(palette) : undefined));
            }
        }
        for (let i = (this.data.fields.length >= 4 ? 4 : 1); i < this.data.fields.length; i++) {
            await this['resolveCode'](ctx, this.data.fields[i]);
        }
        if (!ctx.gifManager || ctx.gifManager.currentEncoder.length === 0)
            return this.customError(classes_1.FCError.NoSizeAndPalette);
        ctx.gifManager.setEncoder(name, ctx.gifManager.lastCurrentEncoder);
        ctx.gifManager.currentEncoder = ctx.gifManager.currentEncoder.slice(0, ctx.gifManager.currentEncoder.length - 1);
        return this.success();
    }
});

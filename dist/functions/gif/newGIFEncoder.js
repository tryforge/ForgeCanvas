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
        if (!ctx.gifManager || !(ctx.gifManager instanceof classes_1.GIFManager))
            ctx.gifManager = new classes_1.GIFManager();
        const options = await this['resolveMultipleArgs'](ctx, 0, 1, 2, 3);
        let [name, width, height, palette] = options.args;
        const r = options.return;
        if (!r?.success)
            return r;
        try {
            palette = JSON.parse(palette);
        }
        catch (_) { }
        ;
        ctx.gifManager.currentEncoder.push(new gifsx_1.Encoder(width, height, Array.isArray(palette)
            ? Uint8Array.from(palette)
            : undefined));
        for (let i = 4; i < this.data.fields.length; i++) {
            const r = await this['resolveCode'](ctx, this.data.fields[i]);
            if (!r?.success)
                return r;
        }
        ctx.gifManager.setEncoder(name, ctx.gifManager.lastCurrentEncoder);
        ctx.gifManager.currentEncoder = ctx.gifManager.currentEncoder.slice(0, ctx.gifManager.currentEncoder.length - 1);
        return this.success();
    }
});

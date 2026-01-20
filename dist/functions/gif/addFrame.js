"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("../..");
exports.default = new forgescript_1.NativeFunction({
    name: '$addFrame',
    description: 'Adds a frame to the GIF.',
    version: '1.2.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'gif',
            description: 'Name of the GIF.',
            type: forgescript_1.ArgType.String,
            required: false,
            rest: false
        },
        {
            name: 'frame',
            description: 'Frame source.',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false
        },
        {
            name: 'options',
            description: 'Frame options.',
            type: forgescript_1.ArgType.Json,
            required: false,
            rest: false
        },
        {
            name: 'speed',
            description: 'Frame rgb quantization speed.',
            type: forgescript_1.ArgType.Number,
            check: (x) => x >= 1 && x <= 30,
            required: false,
            rest: false
        }
    ],
    async execute(ctx, [name, frame, options, speed]) {
        const gif = name
            ? ctx.gifManager?.getEncoder(name)
            : ctx.gifManager?.lastCurrentEncoder;
        if (!gif)
            return this.customError(__1.FCError.NoEncoder);
        const f = await __1.CanvasUtil.resolveFrame(this, ctx, frame, speed);
        if (f instanceof forgescript_1.Return)
            return f;
        if (options) {
            if (typeof options.delay === 'number')
                f.delay = options.delay;
            // @ts-ignore
            if (options.dispose && gifsx_1.DisposalMethod[options.dispose])
                f.dispose = options.dispose;
            if (typeof options.transparent === 'number')
                f.transparent = options.transparent;
            if (typeof options.needsUserInput === 'boolean')
                f.needsUserInput = options.needsUserInput;
            if (typeof options.top === 'number')
                f.top = options.top;
            if (typeof options.left === 'number')
                f.left = options.left;
            if (typeof options.interlaced === 'boolean')
                f.interlaced = options.interlaced;
            if (Array.isArray(options.palette))
                f.setPalette(Uint8Array.from(options.palette));
        }
        gif.addFrame(f);
        return this.success();
    }
});

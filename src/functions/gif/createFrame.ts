import { ArgType, NativeFunction, Return } from '@tryforge/forgescript';
import { DisposalMethod } from '@gifsx/gifsx';
import { GIFManager, CanvasUtil } from '../..';

export default new NativeFunction({
    name: '$createFrame',
    aliases: ['$createGIFFrame', '$newFrame', '$newGIFFrame'],
    description: 'Creates a new GIF Frame.',
    version: '1.2.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'frame',
            description: 'Name of the new GIF Frame.',
            type: ArgType.String,
            required: true,
            rest: false
        },
        {
            name: 'src',
            description: 'Source of the GIF Frame.',
            type: ArgType.String,
            required: true,
            rest: false
        },
        {
            name: 'options',
            description: 'Options for the GIF Frame.',
            type: ArgType.Json,
            required: false,
            rest: false
        },
        {
            name: 'speed',
            description: 'Frame rgb quantization speed.',
            type: ArgType.Number,
            check: (x: number) => x >= 1 && x <= 30,
            required: false,
            rest: false
        }
    ],
    async execute (ctx, [name, frame, options, speed]) {
        if (!ctx.gifManager || !(ctx.gifManager instanceof GIFManager))
            ctx.gifManager = new GIFManager();
        
        const f = await CanvasUtil.resolveFrame(this, ctx, frame, speed);
        if (f instanceof Return) return f;

        if (options) {
            if (typeof options.delay === 'number') f.delay = options.delay;

            // @ts-ignore
            if (options.dispose && DisposalMethod[options.dispose])
                f.dispose = options.dispose as DisposalMethod;

            if (typeof options.transparent === 'number')
                f.transparent = options.transparent;

            if (typeof options.needsUserInput === 'boolean')
                f.needsUserInput = options.needsUserInput;

            if (typeof options.top === 'number') f.top = options.top;
            if (typeof options.left === 'number') f.left = options.left;

            if (typeof options.interlaced === 'boolean') f.interlaced = options.interlaced;

            if (Array.isArray(options.palette)) f.setPalette(Uint8Array.from(options.palette));
        };

        ctx.gifManager.setFrame(name, f);
        return this.success();
    }
});
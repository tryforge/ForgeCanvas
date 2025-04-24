import { ArgType, NativeFunction } from '@tryforge/forgescript';
import { FrameOption } from '../..';
import { Frame } from '@gifsx/gifsx';

export default new NativeFunction({
    name: '$frameOption',
    aliases: ['$frameProperty', '$gifFrameOption', '$frameProp', '$frameOpt'],
    description: 'Sets or returns a GIF Frame option.',
    version: '1.2.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'frame',
            description: 'Name of the GIF Frame.',
            type: ArgType.String,
            required: true,
            rest: false
        },
        {
            name: 'option',
            description: 'Option to get.',
            type: ArgType.Enum,
            enum: FrameOption,
            required: true,
            rest: false
        }
    ],
    async execute (ctx, [name, option]) {
        const frame = ctx.gifManager?.getFrame(name);
        if (!frame) return this.success();

        const opt = frame?.[
            (typeof option === 'number'
                ? FrameOption[option] : option
            ) as unknown as keyof Frame
        ];

        if (opt instanceof Uint8ClampedArray || opt instanceof ArrayBuffer || Array.isArray(opt)) {
            if (opt instanceof Uint8ClampedArray)
                return this.success(`[${Array.from(opt).join(', ')}]`);
            if (Array.isArray(opt))
                return this.success(`[${opt.map(x => typeof x === 'string' ? `"${x}"` : x).join(', ')}]`);
            
            return this.success(`[${Array.from(new Uint8Array(opt)).join(', ')}]`);
        };
        
        return this.success(opt);
    }
});
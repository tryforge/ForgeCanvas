import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { Context, registerFonts } from '../..';

export default new NativeFunction({
    name: '$registerFont',
    description: 'Registers a font.',
    version: '1.0.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'src',
            description: 'The font source path.',
            type: ArgType.String,
            required: true,
            rest: false
        },
        {
            name: 'name',
            description: 'The font name.',
            type: ArgType.String,
            required: false,
            rest: false
        },
        {
            name: 'log',
            description: 'Whether to log the registration.',
            type: ArgType.Boolean,
            required: false,
            rest: false
        }
    ],
    async execute (_: Context, [src, name, log]) {
        await registerFonts([{ src: src, name }], log ?? false);
        return this.success();
    }
});
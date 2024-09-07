import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { Context, registerFonts } from '../..';
import { join } from 'node:path';

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
        }
    ],
    async execute (_: Context, [src, name]) {
        return await registerFonts([{ src: src, name }])
        .then(_ => this.success())
        .catch(r => this.customError(r));
    }
});
import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { GlobalFonts } from '@napi-rs/canvas';

export default new NativeFunction({
    name: '$fontFamilies',
    aliases: ['$fontFam', '$fonts', '$fontNames'],
    description: 'Returns a list of the available fonts.',
    version: '1.0.0',
    brackets: false,
    unwrap: true,
    args: [{
        name: 'separator',
        description: 'The font separator.',
        type: ArgType.String,
        required: false,
        rest: false
    }],
    execute (_, [sep]) {
        return this.success(
            GlobalFonts.families
                .map(x => x?.family)
                .join(sep ?? ', ')
        );
    }
});
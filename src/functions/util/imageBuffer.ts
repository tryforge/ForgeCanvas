import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { Image, loadImage } from '@napi-rs/canvas';
import { Context, WidthOrHeight } from '../..';


export default new NativeFunction({
    name: '$imageBuffer',
    description: 'Returns image\'s buffer.',
    version: '1.2.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'path',
            description: 'The image path.',
            type: ArgType.String,
            required: true,
            rest: false
        }
    ],
    async execute (ctx: Context, [path]) {
        let image: Image | undefined

        if (path.startsWith('images://') && ctx.imageManager)
            image = ctx.imageManager.get(path.slice(9));
        else image = await loadImage(path);
        if (!image) return this.customError('Invalid image');
        
        return this.success(
            typeof image.src !== 'string'
                ? `[${Array.from(image.src).join(', ')}]`
            : image.src
        );
    }
});

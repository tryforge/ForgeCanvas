import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { Context, WidthOrHeight } from '../..';
import { Image, loadImage } from '@napi-rs/canvas';

export default new NativeFunction({
    name: '$imageSize',
    description: 'Returns image\'s size.',
    version: '1.1.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'path',
            description: 'The image path.',
            type: ArgType.String,
            required: true,
            rest: false
        },
        {
            name: 'property',
            description: 'The size property to return.',
            type: ArgType.Enum,
            enum: WidthOrHeight,
            required: false,
            rest: false
        }
    ],
    async execute (ctx: Context, [path, property]) {
        let image: Image | undefined;
        if (path.startsWith('images://') && ctx.imageManager)
            image = ctx.imageManager.get(path.slice(9));
        else image = await loadImage(path);
        
        if (!image) return this.customError('Failed to load image.');

        return this.success(property !== null // @ts-ignore
            ? image[WidthOrHeight[
                (typeof property === 'string' ? WidthOrHeight[property] : property) as any
            ]]
            : JSON.stringify({ width: image.width, height: image.height })
        );
    }
});

import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { Image, loadImage } from '@napi-rs/canvas';
import { FCError } from '../../classes';

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
    async execute (ctx, [path]) {
        let image: Image | undefined

        if (path.startsWith('images://')) {
            path = path.slice(9);

            let manager = ctx.imageManager;
            if (path.startsWith('preload://')) {
                path = path.slice(10);
                manager = ctx.client.preloadImages;
            }

            image = manager?.get(path);
        } else image = await loadImage(path);
        if (!image) return this.customError(FCError.NoImage);
        
        return this.success(`[${Array.from(
            await image.getBuffer() ?? []
        ).join(', ')}]`);
    }
});

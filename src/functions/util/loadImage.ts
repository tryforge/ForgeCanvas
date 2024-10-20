import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { ImageManager, Context } from '../..';
import { loadImage } from '@napi-rs/canvas';

export default new NativeFunction({
    name: '$loadImage',
    aliases: ['$createImage', '$newImage'],
    description: 'Loads an image.',
    version: '1.1.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'name',
            description: 'The image name.',
            type: ArgType.String,
            required: true,
            rest: false
        },
        {
            name: 'path',
            description: 'The image path.',
            type: ArgType.String,
            required: true,
            rest: false
        }
    ],
    async execute (ctx: Context, [name, path]) {
        if (!ctx.imageManager || !(ctx.imageManager instanceof ImageManager))
            ctx.imageManager = new ImageManager();

        ctx.imageManager.set(name, await loadImage(path));
        return this.success();
    }
});
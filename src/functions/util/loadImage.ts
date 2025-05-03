import { NativeFunction, ArgType, Return } from '@tryforge/forgescript';
import { CanvasUtil, ImageManager } from '../..';

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
            name: 'src',
            description: 'The image source.',
            type: ArgType.String,
            required: true,
            rest: false
        }
    ],
    async execute (ctx, [name, src]) {
        if (!ctx.imageManager || !(ctx.imageManager instanceof ImageManager))
            ctx.imageManager = new ImageManager();

        const img = await CanvasUtil.resolveImage(this, ctx, src);
        if (img instanceof Return) return img;

        ctx.imageManager.set(name, img);
        return this.success();
    }
});
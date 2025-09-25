import { NativeFunction, ArgType, Return } from '@tryforge/forgescript';
import { CanvasUtil } from '../..';

export default new NativeFunction({
    name: '$preloadImage',
    description: 'Loads an image globally. Recommended for images that will be used in multiple commands. Use preload://name to draw.',
    version: '1.2.4',
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
        const img = await CanvasUtil.resolveImage(this, ctx, src);
        if (img instanceof Return) return img;

        ctx.client.preloadImages.set(name, img);
        return this.success();
    }
});
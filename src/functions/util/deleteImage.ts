import { NativeFunction, ArgType } from '@tryforge/forgescript';

export default new NativeFunction({
    name: '$deleteImage',
    aliases: ['$removeImage'],
    description: 'Deletes the image.',
    version: '1.2.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'name',
            description: 'Name of the image.',
            type: ArgType.String,
            required: true,
            rest: false
        }
    ],
    execute (ctx, [name]) {
        let manager = ctx.imageManager;
        if (name.startsWith('preload://')) {
            name = name.slice(10);
            manager = ctx.client.preloadImages;
        }

        manager?.remove(name);
        return this.success();
    }
});
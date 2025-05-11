import { ArgType, NativeFunction } from '@tryforge/forgescript';
import { Encoder } from '@gifsx/gifsx';
import { FCError, GIFManager } from '../..';

export default new NativeFunction({
    name: '$setEncoderOptions',
    aliases: ['$setGIFOptions', '$setEncoderConfig', '$setGIFConfig'],
    description: 'Sets the size and global palette for the new GIF encoder.',
    version: '1.2.0',
    brackets: true, 
    deprecated: true,
    unwrap: true,
    args: [
        {
            name: 'width',
            description: 'Width of the new canvas.',
            type: ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'height',
            description: 'Height of the new canvas.',
            type: ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'palette',
            description: 'Palette for the GIF.',
            type: ArgType.Json,
            required: false,
            rest: false
        }
    ],
    execute (ctx, [width, height, palette]) {
        if (!ctx.gifManager || !(ctx.gifManager instanceof GIFManager))
            ctx.gifManager = new GIFManager();

        if (palette !== null && !Array.isArray(palette))
            return this.customError(FCError.ArrayExpected);

        ctx.gifManager.currentEncoder.push(new Encoder(
            width, height,
            Uint8Array.from(palette ?? [])
        ));
        return this.success();
    }
});
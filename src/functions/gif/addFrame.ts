import { createCanvas, loadImage } from '@napi-rs/canvas';
import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { CanvasBuilder, CanvasManager, GIFManager, Context } from '../../';
import { existsSync } from 'node:fs';
import { createGzip } from 'node:zlib';

export default new NativeFunction({
    name: '$addFrame',
    description: 'Adds a frame to the GIF.',
    version: '1.0.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'gif',
            description: 'Name of the GIF.',
            type: ArgType.String,
            required: true,
            rest: false
        },
        {
            name: 'frame',
            description: 'The frame to add (Path | URL | Canvas).',
            type: ArgType.String,
            required: true,
            rest: false
        }
    ],
    async execute(ctx: Context, [gifName, frame]) {
        const gif = ctx.gifManager?.get(gifName);

        if (!gif) {
            return this.customError('No GIF with the provided name found.');
        }

        let frameData;
        if (frame.startsWith('canvas://')) {
            frameData = ctx.canvasManager?.get(frame.split('canvas://').slice(1).join('://'))?.ctx;
        } else {
            const frameExists = await existsSync(frame);
            if (!frameExists && !ctx.checkType({ type: ArgType.String}, frame)) {
                return this.customError('Invalid frame source provided.');
            }

            const img = await loadImage(frame);
            const canvasCtx = createCanvas(img.width, img.height).getContext('2d');
            canvasCtx.drawImage(img, 0, 0, img.width, img.height);
            frameData = canvasCtx;
        }

        await gif.addFrame(frameData);

        return this.success();
    }
});

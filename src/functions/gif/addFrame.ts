import { createCanvas, loadImage } from '@napi-rs/canvas';
import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { Context } from '../../';
import { existsSync } from 'node:fs';

export default new NativeFunction({
    name: '$addFrame',
    description: 'Adds a frame to the GIF.',
    version: '1.1.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'gif',
            description: 'Name of the GIF.',
            type: ArgType.String,
            required: false,
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
        const gif = gifName
            ? ctx.gifManager?.get(gifName)
                : !gifName && ctx.gifManager?.current?.length !== 0 
                    ? ctx.gifManager?.current?.[ctx.gifManager?.current?.length - 1] : null;

        if (!gif)
            return this.customError('No GIF.');

        let frameData;
        if (frame.startsWith('canvas://')) 
            frameData = ctx.canvasManager?.get(frame.slice(9))?.ctx;
        else if (frame.startsWith('images://')) {
            const img = ctx?.imageManager?.get(frame.slice(9));

            if (!img)
                return this.customError('Invalid frame source provided.');

            const { width, height } = img;
            const canvasCtx = createCanvas(width, height).getContext('2d');
            canvasCtx.drawImage(img, 0, 0, width, height);
            frameData = canvasCtx;
        } else {
            const frameExists = await existsSync(frame);
            if (!frameExists && (() => { try {new URL(frame); return false} catch {return true}})())
                return this.customError('Invalid frame source provided.');

            const img = await loadImage(frame);
            const { width, height } = img;

            const canvasCtx = createCanvas(width, height).getContext('2d');
            canvasCtx.drawImage(img, 0, 0, width, height);
            frameData = canvasCtx;
        };

        if (!frameData) return this.customError('No data.');
        await gif.addFrame(frameData);
        return this.success();
    }
});
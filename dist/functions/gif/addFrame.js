"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const canvas_1 = require("@napi-rs/canvas");
const forgescript_1 = require("@tryforge/forgescript");
const node_fs_1 = require("node:fs");
exports.default = new forgescript_1.NativeFunction({
    name: '$addFrame',
    description: 'Adds a frame to the GIF.',
    version: '1.1.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'gif',
            description: 'Name of the GIF.',
            type: forgescript_1.ArgType.String,
            required: false,
            rest: false
        },
        {
            name: 'frame',
            description: 'The frame to add (Path | URL | Canvas).',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false
        }
    ],
    async execute(ctx, [gifName, frame]) {
        const gif = gifName
            ? ctx.gifManager?.get(gifName)
            : !gifName && ctx.gifManager?.current?.length !== 0
                ? ctx.gifManager?.current?.[ctx.gifManager?.current?.length - 1] : null;
        if (!gif) {
            return this.customError('No GIF with the provided name found.');
        }
        let frameData;
        if (frame.startsWith('canvas://'))
            frameData = ctx.canvasManager?.get(frame.slice(9))?.ctx;
        else if (frame.startsWith('images://')) {
            const img = ctx?.imageManager?.get(frame.slice(9));
            if (!img)
                return this.customError('Invalid frame source provided.');
            const { width, height } = img;
            const canvasCtx = (0, canvas_1.createCanvas)(width, height).getContext('2d');
            canvasCtx.drawImage(img, 0, 0, width, height);
            frameData = canvasCtx;
        }
        else {
            const frameExists = await (0, node_fs_1.existsSync)(frame);
            if (!frameExists && (() => { try {
                new URL(frame);
                return false;
            }
            catch {
                return true;
            } })()) {
                return this.customError('Invalid frame source provided.');
            }
            const img = await (0, canvas_1.loadImage)(frame);
            const { width, height } = img;
            const canvasCtx = (0, canvas_1.createCanvas)(width, height).getContext('2d');
            canvasCtx.drawImage(img, 0, 0, width, height);
            frameData = canvasCtx;
        }
        ;
        if (!frameData)
            return this.customError('No data.');
        await gif.addFrame(frameData);
        return this.success();
    }
});
//# sourceMappingURL=addFrame.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const canvas_1 = require("@napi-rs/canvas");
const forgescript_1 = require("@tryforge/forgescript");
const node_fs_1 = require("node:fs");
exports.default = new forgescript_1.NativeFunction({
    name: '$addFrame',
    description: 'Adds a frame to the GIF.',
    version: '1.0.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'gif',
            description: 'Name of the GIF.',
            type: forgescript_1.ArgType.String,
            required: true,
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
        const gif = ctx.gifManager?.get(gifName);
        if (!gif) {
            return this.customError('No GIF with the provided name found.');
        }
        let frameData;
        if (frame.startsWith('canvas://')) {
            frameData = ctx.canvasManager?.get(frame.split('canvas://').slice(1).join('://'))?.ctx;
        }
        else {
            const frameExists = await (0, node_fs_1.existsSync)(frame);
            if (!frameExists && !ctx.checkType({ type: forgescript_1.ArgType.String }, frame)) {
                return this.customError('Invalid frame source provided.');
            }
            const img = await (0, canvas_1.loadImage)(frame);
            const canvasCtx = (0, canvas_1.createCanvas)(img.width, img.height).getContext('2d');
            canvasCtx.drawImage(img, 0, 0, img.width, img.height);
            frameData = canvasCtx;
        }
        await gif.addFrame(frameData);
        return this.success();
    }
});
//# sourceMappingURL=addFrame.js.map
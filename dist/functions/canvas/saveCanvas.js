"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("../..");
const node_fs_1 = require("node:fs");
const canvas_1 = require("@napi-rs/canvas");
exports.default = new forgescript_1.NativeFunction({
    name: '$saveCanvas',
    aliases: ['$downloadCanvas', '$canvasSave', '$canvasDownload'],
    description: 'Saves a canvas to a file.',
    version: '1.1.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'canvas',
            description: 'Name of the canvas.',
            type: forgescript_1.ArgType.String,
            required: false,
            rest: false
        },
        {
            name: 'path',
            description: 'Path to a directory. (including the canvas file name and extension)',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false
        }
    ],
    async execute(ctx, [name, path]) {
        const canvas = name
            ? ctx.canvasManager?.get(name)
            : !name && ctx.canvasManager?.current?.length !== 0
                ? ctx.canvasManager?.current?.[ctx.canvasManager?.current?.length - 1] : null;
        if (!canvas)
            return this.customError('No canvas');
        if (!path)
            return this.customError('No path provided.');
        if (!path.startsWith('images://'))
            (0, node_fs_1.writeFileSync)(path, canvas.buffer);
        if (!ctx.imageManager)
            ctx.imageManager = new __1.ImageManager();
        ctx.imageManager.set(path.slice(9), await (0, canvas_1.loadImage)(canvas.buffer));
        return this.success();
    }
});
//# sourceMappingURL=saveCanvas.js.map
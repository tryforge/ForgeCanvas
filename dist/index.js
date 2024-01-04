"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgeCanvas = void 0;
const canvas_1 = require("@napi-rs/canvas");
const forgescript_1 = require("forgescript");
class ForgeCanvas extends forgescript_1.ForgeExtension {
    static canvas;
    static ctx;
    name = "ForgeCanvas";
    description = "A fast and reliable canvas extension for Forge";
    version = "1.0.0";
    constructor() {
        super();
    }
    init(client) {
        this.load(__dirname + "/functions");
        client.canvas = ForgeCanvas.ctx;
    }
    static create(width, height) {
        return this.ctx = (0, canvas_1.createCanvas)(width, height).getContext('2d');
    }
    static async drawImage(image, dx, dy, dw, dh) {
        image = await (0, canvas_1.loadImage)(image);
        return this.ctx.drawImage(image, dx, dy, (dw ?? image.width), (dh ?? image.height));
    }
    static render() {
        return this.ctx.canvas.toBuffer('image/png');
    }
}
exports.ForgeCanvas = ForgeCanvas;
//# sourceMappingURL=index.js.map
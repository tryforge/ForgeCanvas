"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasBuilder = void 0;
const canvas_1 = require("@napi-rs/canvas");
class CanvasBuilder {
    static ctx;
    constructor(width, height) {
        CanvasBuilder.ctx = (0, canvas_1.createCanvas)(width, height).getContext("2d");
    }
    drawImage = async (image, x, y, width, height, radius) => {
        image = await (0, canvas_1.loadImage)(image);
        width = width ?? image.width;
        height = height ?? image.height;
        const ctx = CanvasBuilder.ctx;
        if (radius && radius > 0) {
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(x + radius, y);
            ctx.arcTo(x + width, y, x + width, y + height, radius);
            ctx.arcTo(x + width, y + height, x, y + height, radius);
            ctx.arcTo(x, y + height, x, y, radius);
            ctx.arcTo(x, y, x + width, y, radius);
            ctx.closePath();
            ctx.clip();
        }
        ;
        ctx.drawImage(image, x, y, width, height);
        return ctx;
    };
    fillText = (text, x, y, font, color) => {
        const ctx = CanvasBuilder.ctx;
        const oldfont = ctx.font;
        const oldcolor = ctx.fillStyle;
        ctx.font = font;
        ctx.fillStyle = `rgb(${(color >> 16) & 0xFF},${(color >> 8) & 0xFF},${color & 0xFF})`;
        ctx.fillText(text, x, y);
        ctx.font = oldfont;
        ctx.fillStyle = oldcolor;
        return ctx;
    };
    strokeText = (text, x, y, font, color, width) => {
        const ctx = CanvasBuilder.ctx;
        const oldfont = ctx.font;
        const oldcolor = ctx.strokeStyle;
        const oldwidth = ctx.lineWidth;
        ctx.font = font;
        ctx.strokeStyle = `rgb(${(color >> 16) & 0xFF},${(color >> 8) & 0xFF},${color & 0xFF})`;
        ctx.lineWidth = width ?? 3;
        ctx.strokeText(text, x, y);
        ctx.font = oldfont;
        ctx.strokeStyle = oldcolor;
        ctx.lineWidth = oldwidth;
        return ctx;
    };
    fillRect = (color, x, y, width, height, radius) => {
        const ctx = CanvasBuilder.ctx;
        const oldcolor = ctx.fillStyle;
        ctx.fillStyle = `rgb(${(color >> 16) & 0xFF},${(color >> 8) & 0xFF},${color & 0xFF})`;
        if (radius && radius > 0) {
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(x + radius, y);
            ctx.arcTo(x + width, y, x + width, y + height, radius);
            ctx.arcTo(x + width, y + height, x, y + height, radius);
            ctx.arcTo(x, y + height, x, y, radius);
            ctx.arcTo(x, y, x + width, y, radius);
            ctx.closePath();
            ctx.clip();
        }
        ;
        ctx.fillRect(x, y, width, height);
        ctx.fillStyle = oldcolor;
        return ctx;
    };
    strokeRect = (color, x, y, width, height, strokeWidth, radius) => {
        const ctx = CanvasBuilder.ctx;
        const oldcolor = ctx.strokeStyle;
        const oldwidth = ctx.lineWidth;
        ctx.strokeStyle = `rgb(${(color >> 16) & 0xFF},${(color >> 8) & 0xFF},${color & 0xFF})`;
        ctx.lineWidth = strokeWidth ?? 3;
        if (radius && radius > 0) {
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(x + radius, y);
            ctx.arcTo(x + width, y, x + width, y + height, radius);
            ctx.arcTo(x + width, y + height, x, y + height, radius);
            ctx.arcTo(x, y + height, x, y, radius);
            ctx.arcTo(x, y, x + width, y, radius);
            ctx.closePath();
            ctx.clip();
        }
        ;
        ctx.strokeRect(x, y, width, height);
        ctx.strokeStyle = oldcolor;
        ctx.lineWidth = oldwidth;
        return ctx;
    };
    render = () => {
        return CanvasBuilder.ctx.canvas.toBuffer("image/png");
    };
}
exports.CanvasBuilder = CanvasBuilder;
//# sourceMappingURL=builder.js.map
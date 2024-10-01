"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasBuilder = void 0;
const canvas_1 = require("@napi-rs/canvas");
const __1 = require("..");
const __2 = require("..");
class CanvasBuilder {
    ctx;
    utl = __2.CanvasUtil;
    get width() { return this.ctx.canvas.width; }
    ;
    get height() { return this.ctx.canvas.height; }
    ;
    constructor(width, height) {
        this.ctx = (0, canvas_1.createCanvas)(width, height).getContext('2d');
    }
    ;
    rect(type, x, y, width, height, radius) {
        const ctx = this.ctx;
        width ??= ctx.canvas.width - x;
        height ??= ctx.canvas.height - y;
        radius ??= 0;
        if (type === __1.FillOrStrokeOrClear.none)
            return ctx.roundRect(x, y, width, height, radius);
        ctx.save();
        ctx.beginPath();
        ctx.roundRect(x, y, width, height, radius);
        ({
            [__1.FillOrStrokeOrClear.clear]: () => ctx.clearRect(x, y, width, height),
            [__1.FillOrStrokeOrClear.fill]: () => ctx.fill(),
            [__1.FillOrStrokeOrClear.stroke]: () => ctx.stroke()
        })[type]();
        ctx.restore();
    }
    ;
    text(type, text, x, y, font, maxWidth, multiline, wrap, lineOffset) {
        const ctx = this.ctx, oldfont = ctx.font, fontsize = parseFloat(__1.fontRegex.exec(font)[4]), lines = multiline ? text.split('\n') : [text], func = (text, x, y, maxWidth) => type === __1.FillOrStroke.fill
            ? ctx.fillText(text, x, y, maxWidth)
            : ctx.strokeText(text, x, y, maxWidth);
        let offset = y;
        maxWidth ??= undefined;
        ctx.font = font;
        if (multiline || wrap) {
            lines.forEach(t => {
                if (wrap) {
                    let line = '';
                    t.split(' ').forEach((word, i) => {
                        if (maxWidth && ctx.measureText(line + word + ' ').width > maxWidth && i > 0) {
                            func(line, x, offset, maxWidth);
                            line = word + ' ';
                            offset += fontsize + (lineOffset ?? 0);
                        }
                        else
                            line += word + ' ';
                    });
                    func(line, x, offset, maxWidth);
                    offset += fontsize + (lineOffset ?? 0);
                }
                else {
                    func(t, x, offset, maxWidth);
                    offset += fontsize + (lineOffset ?? 0);
                }
                ;
            });
        }
        else
            func(text, x, y, maxWidth);
        ctx.font = oldfont;
    }
    ;
    async drawImage(image, x, y, width, height, radius) {
        const ctx = this.ctx;
        image = await (0, canvas_1.loadImage)(image);
        width ??= image.width;
        height ??= image.height;
        if (!radius)
            return ctx.drawImage(image, x, y, width, height);
        ctx.save();
        ctx.beginPath();
        ctx.roundRect(x, y, width, height, radius);
        ctx.clip();
        ctx.drawImage(image, x, y, width, height);
        ctx.restore();
        return;
    }
    ;
    measureText(text, font) {
        const ctx = this.ctx, oldcolor = ctx.fillStyle, oldfont = ctx.font;
        ctx.fillStyle = '#000000';
        ctx.font = font;
        const metrics = ctx.measureText(text);
        ctx.fillStyle = oldcolor;
        ctx.font = oldfont;
        return metrics;
    }
    ;
    filter(method, filter, value) {
        const ctx = this.ctx;
        if (filter && typeof filter === 'string')
            filter = __1.Filters[filter];
        const PxOrPerc = filter === __1.Filters.grayscale || filter === __1.Filters.sepia ? '%' :
            (filter === __1.Filters.blur ? 'px' : '');
        if (method === __1.FilterMethod.add) {
            if (!filter || !value)
                return;
            ctx.filter = __2.CanvasUtil.parseFilters((ctx.filter === 'none' ? '' : ctx.filter) + `${__1.Filters[filter]}(${value + PxOrPerc})`)?.map(x => x?.raw)?.join(' ')?.trim();
        }
        else if (method === __1.FilterMethod.set) {
            if (!filter || !value)
                return;
            ctx.filter = `${__1.Filters[filter]}(${value + PxOrPerc})`;
        }
        else if (method === __1.FilterMethod.remove) {
            if (!filter)
                return;
            let filters = __2.CanvasUtil.parseFilters(ctx.filter);
            const index = filters.findIndex((obj) => obj?.filter === __1.Filters[filter]);
            if (index !== -1)
                filters.splice(index, 1);
            ctx.filter = filters.length > 0 ? filters?.map(x => x?.raw)?.join(' ')?.trim() : 'none';
        }
        else if (method === __1.FilterMethod.clear)
            ctx.filter = 'none';
        else if (method === __1.FilterMethod.get)
            return ctx.filter;
        else if (method === __1.FilterMethod.json)
            return __2.CanvasUtil.parseFilters(ctx.filter);
    }
    ;
    rotate(angle) {
        const ctx = this.ctx;
        const centerX = ctx.canvas.width / 2;
        const centerY = ctx.canvas.height / 2;
        ctx.translate(centerX, centerY);
        ctx.rotate((angle * Math.PI) / 180);
        ctx.translate(-centerX, -centerY);
    }
    ;
    trim() {
        let ctx = this.ctx, canvas = ctx.canvas, pixels = ctx.getImageData(0, 0, canvas.width, canvas.height), l = pixels.data.length, i, bound = {
            top: canvas.height,
            left: canvas.width,
            right: 0,
            bottom: 0
        }, x, y;
        for (i = 0; i < l; i += 4) {
            if (pixels.data[i + 3] === 0)
                continue;
            x = (i / 4) % canvas.width;
            y = Math.floor((i / 4) / canvas.width);
            if (x < bound.left)
                bound.left = x;
            if (y < bound.top)
                bound.top = y;
            if (y > bound.bottom)
                bound.bottom = y;
            if (x > bound.right)
                bound.right = x;
        }
        ;
        const height = bound.bottom - bound.top + 1;
        const width = bound.right - bound.left + 1;
        const trimmed = ctx.getImageData(bound.left, bound.top, width, height);
        canvas.width = width;
        canvas.height = height;
        ctx.putImageData(trimmed, 0, 0);
    }
    ;
    getPixels(x, y, width, height) {
        const ctx = this.ctx;
        width ??= ctx.canvas.width;
        height ??= ctx.canvas.height;
        const data = ctx.getImageData(x, y, width, height).data;
        const colors = [];
        for (let i = 0; i < data.length; i += 4) {
            colors.push(__2.CanvasUtil.rgbaToHex(data[i], data[i + 1], data[i + 2], data[i + 3] / 255));
        }
        ;
        return colors;
    }
    ;
    setPixels(x, y, width, height, colors) {
        const ctx = this.ctx;
        width ??= ctx.canvas.width;
        height ??= ctx.canvas.height;
        const data = ctx.createImageData(width, height);
        colors?.forEach((hex, i) => {
            const colors = __2.CanvasUtil.hexToRgba(hex);
            i = i * 4;
            data.data[i] = colors.red;
            data.data[i + 1] = colors.green;
            data.data[i + 2] = colors.blue;
            data.data[i + 3] = colors.alpha ?? 255;
        });
        ctx.putImageData(data, x, y);
    }
    ;
    resize(width, height) {
        const ctx = this.ctx, data = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.canvas.width = width;
        ctx.canvas.height = height;
        ctx.putImageData(data, 0, 0);
    }
    ;
    get buffer() { return this.ctx.canvas.toBuffer('image/png'); }
    ;
}
exports.CanvasBuilder = CanvasBuilder;
;
//# sourceMappingURL=builder.js.map
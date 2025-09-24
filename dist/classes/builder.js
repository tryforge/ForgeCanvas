"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasBuilder = void 0;
const gifsx_1 = require("@gifsx/gifsx");
const canvas_1 = require("@napi-rs/canvas");
const __1 = require("..");
class CanvasBuilder {
    ctx;
    util = __1.CanvasUtil;
    customProperties = {};
    get width() { return this.ctx.canvas.width; }
    get height() { return this.ctx.canvas.height; }
    set width(val) { this.resize(val, this.height); }
    set height(val) { this.resize(this.width, val); }
    constructor(width, height) {
        this.ctx = (0, canvas_1.createCanvas)(width, height).getContext('2d');
    }
    rect(type, x, y, width, height, radius) {
        const ctx = this.ctx;
        width ??= ctx.canvas.width - x;
        height ??= ctx.canvas.height - y;
        radius ??= 0;
        if (this.customProperties.rectAlign)
            x = __1.CanvasUtil.calculateRectAlignOrBaseline(x, width, this.customProperties.rectAlign);
        if (this.customProperties.rectBaseline)
            y = __1.CanvasUtil.calculateRectAlignOrBaseline(y, height, this.customProperties.rectBaseline);
        if (type === __1.FillOrStrokeOrClear.none)
            return ctx.roundRect(x, y, width, height, radius);
        if (!radius) {
            if (type === __1.FillOrStrokeOrClear.fill)
                ctx.fillRect(x, y, width, height);
            else if (type === __1.FillOrStrokeOrClear.stroke)
                ctx.strokeRect(x, y, width, height);
            else
                ctx.clearRect(x, y, width, height);
            return;
        }
        ctx.save();
        ctx.beginPath();
        ctx.roundRect(x, y, width, height, radius);
        if (type === __1.FillOrStrokeOrClear.fill)
            ctx.fill();
        else if (type === __1.FillOrStrokeOrClear.stroke)
            ctx.stroke();
        else
            (ctx.clip(), ctx.clearRect(x, y, width, height));
        ctx.restore();
    }
    ;
    text(type, text, x, y, font, maxWidth, multiline, wrap, lineOffset) {
        const ctx = this.ctx, fontsize = Number.parseFloat(__1.fontRegex.exec(font)[4]), lines = multiline ? text.split('\n') : [text], func = (text, x, y, maxWidth) => type === __1.FillOrStroke.fill
            ? ctx.fillText(text, x, y, maxWidth)
            : ctx.strokeText(text, x, y, maxWidth);
        maxWidth ??= undefined;
        lineOffset ??= 0;
        ctx.font = font;
        if (multiline || wrap) {
            for (const t of lines) {
                if (wrap) {
                    let line = '';
                    const words = t.split(' ');
                    for (let i = 0; i < words.length; i++) {
                        const word = words[i];
                        if (!word?.trim()?.length)
                            return;
                        if (maxWidth && ctx.measureText(line + word + ' ').width > maxWidth && i > 0) {
                            func(line, x, y, maxWidth);
                            line = word + ' ';
                            y += fontsize + lineOffset;
                        }
                        else
                            line += word + ' ';
                    }
                    func(line, x, y, maxWidth);
                    y += fontsize + lineOffset;
                }
                else {
                    func(t, x, y, maxWidth);
                    y += fontsize + lineOffset;
                }
            }
        }
        else
            func(text, x, y, maxWidth);
    }
    async drawImage(image, x, y, width, height, radius) {
        const ctx = this.ctx;
        image = await (0, canvas_1.loadImage)(image);
        width ??= image.width;
        height ??= image.height;
        if (this.customProperties.rectAlign)
            x = __1.CanvasUtil.calculateRectAlignOrBaseline(x, width, this.customProperties.rectAlign);
        if (this.customProperties.rectBaseline)
            y = __1.CanvasUtil.calculateRectAlignOrBaseline(y, height, this.customProperties.rectBaseline);
        if (!radius)
            return ctx.drawImage(image, x, y, width, height);
        ctx.save();
        ctx.beginPath();
        ctx.roundRect(x, y, width, height, radius);
        ctx.clip();
        ctx.drawImage(image, x, y, width, height);
        ctx.restore();
    }
    drawProgressBar(x, y, width, height, progress, config = {}) {
        const ctx = this.ctx;
        progress = Math.min(progress || 0, 100) / 100;
        const options = {
            style: config?.style ?? '#FFFFFF',
            background: {
                enabled: config?.background?.enabled ?? true,
                style: config?.background?.style ?? '#000000',
                radius: config?.background?.radius,
                type: config?.background?.type ?? 'fill',
                padding: config?.background?.padding ?? 0
            },
            type: config?.type ?? 'fill',
            radius: config?.radius,
            direction: config?.direction ?? 'horizontal',
            clip: config?.clip,
            left: config?.left
        };
        if (this.customProperties.rectAlign)
            x = __1.CanvasUtil.calculateRectAlignOrBaseline(x, width, this.customProperties.rectAlign);
        if (this.customProperties.rectBaseline)
            y = __1.CanvasUtil.calculateRectAlignOrBaseline(y, height, this.customProperties.rectBaseline);
        if (options.background.enabled) {
            if (options.background.type !== 'clear') {
                ctx.save();
                ctx[`${options.background.type}Style`] = options.background.style;
                ctx.beginPath();
                ctx.roundRect(x, y, width, height, options.background.radius);
                ctx[options.background.type]();
                ctx.restore();
            }
            else
                this.rect(__1.FillOrStrokeOrClear.clear, x, y, width, height, options.background.radius);
        }
        if (options.background.padding) {
            width = width - options.background.padding * 2;
            height = height - options.background.padding * 2;
            x = x + options.background.padding;
            y = y + +options.background.padding;
        }
        const pwidth = Math.min(['horizontal', 'both'].includes(options.direction)
            ? width * progress : width, width);
        const pheight = Math.min(['vertical', 'both'].includes(options.direction)
            ? height * progress : height, height);
        if (options.type === 'clear')
            return (this.rect(__1.FillOrStrokeOrClear.clear, x, y, pwidth, pheight, options.radius), [x, y, width, height, pwidth, pheight]);
        ctx.save();
        if (options.clip !== undefined) {
            ctx.beginPath();
            ctx.roundRect(x, y, width, height, options.clip);
            ctx.clip();
        }
        if (options.left) {
            ctx.fillStyle = options.left;
            ctx.beginPath();
            ctx.roundRect(x, y, width, height, options.radius);
            ctx.fill();
        }
        ctx[`${options.type}Style`] = options.style;
        ctx.beginPath();
        ctx.roundRect(x, y, pwidth, pheight, options.radius);
        ctx[options.type]();
        ctx.restore();
        return [x, y, width, height, pwidth, pheight];
    }
    drawPieChart(x, y, width, height, data, config = {}) {
        const ctx = this.ctx;
        const options = {
            type: config.type ?? 'fill',
            background: {
                enabled: config.background?.enabled ?? true,
                style: config.background?.style ?? '#000000',
                radius: config.background?.radius,
                type: config.background?.type ?? 'fill',
                padding: config.background?.padding ?? 0
            },
            radius: config.radius ?? Math.min(width, height) / 2,
        };
        if (this.customProperties.rectAlign)
            x = __1.CanvasUtil.calculateRectAlignOrBaseline(x, width, this.customProperties.rectAlign);
        if (this.customProperties.rectBaseline)
            y = __1.CanvasUtil.calculateRectAlignOrBaseline(y, height, this.customProperties.rectBaseline);
        if (options.background.enabled) {
            if (options.background.type !== 'clear') {
                ctx.save();
                ctx[`${options.background.type}Style`] = options.background.style;
                ctx.beginPath();
                ctx.roundRect(x, y, width, height, options.background.radius);
                ctx[options.background.type]();
                ctx.restore();
            }
            else
                this.rect(__1.FillOrStrokeOrClear.clear, x, y, width, height, options.background.radius);
        }
        if (options.background.padding) {
            width = width - options.background.padding * 2;
            height = height - options.background.padding * 2;
            x = x + options.background.padding;
            y = y + options.background.padding;
        }
        const total = data.reduce((acc, val) => acc + val.value, 0);
        let angle = 0;
        for (const seg of data) {
            const angl = angle + (seg.value / total) * Math.PI * 2;
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(x + width / 2, y + height / 2);
            ctx.arc(x + width / 2, y + height / 2, Math.min(width, height) / 2, angle, angl);
            ctx.arc(x + width / 2, y + height / 2, options.radius ?? 0, angl, angle, true);
            ctx.lineTo(x + width / 2, y + height / 2);
            ctx.closePath();
            ctx.fillStyle = seg.style;
            ctx.fill();
            ctx.restore();
            angle = angl;
        }
    }
    measureText(text, font) {
        const ctx = this.ctx;
        ctx.fillStyle = '#000000';
        ctx.font = font;
        return ctx.measureText(text);
    }
    filter(method, filter, value) {
        const ctx = this.ctx;
        if (filter && typeof filter === 'string')
            filter = __1.Filters[filter];
        const PxOrPerc = filter === __1.Filters.grayscale || filter === __1.Filters.sepia ? '%' :
            (filter === __1.Filters.blur ? 'px' : '');
        if (method === __1.FilterMethod.add) {
            if (!filter || !value)
                throw new Error(__1.FCError.NoFilterOrValue);
            const result = __1.CanvasUtil.parseFilters((ctx.filter === 'none' ? '' : ctx.filter)
                + `${__1.Filters[filter]}(${value + PxOrPerc})`);
            ctx.filter = result?.map(x => x?.raw)?.join(' ')?.trim() || 'none';
        }
        else if (method === __1.FilterMethod.set) {
            if (!filter || !value)
                throw new Error(__1.FCError.NoFilterOrValue);
            ctx.filter = `${__1.Filters[filter]}(${value + PxOrPerc})`;
        }
        else if (method === __1.FilterMethod.remove) {
            if (!filter)
                throw new Error(__1.FCError.NoFilter);
            const filters = __1.CanvasUtil.parseFilters(ctx.filter);
            const index = filters.findIndex((obj) => obj?.filter === __1.Filters[filter]);
            if (index !== -1)
                filters.splice(index, 1);
            ctx.filter = filters.length > 0
                ? filters?.map(x => x?.raw)?.join(' ')?.trim()
                : 'none';
        }
        else if (method === __1.FilterMethod.clear)
            ctx.filter = 'none';
        else if (method === __1.FilterMethod.get)
            return ctx.filter;
        else if (method === __1.FilterMethod.json)
            return __1.CanvasUtil.parseFilters(ctx.filter);
        return undefined;
    }
    rotate(angle) {
        const ctx = this.ctx;
        const centerX = ctx.canvas.width / 2;
        const centerY = ctx.canvas.height / 2;
        ctx.translate(centerX, centerY);
        ctx.rotate((angle * Math.PI) / 180);
        ctx.translate(-centerX, -centerY);
    }
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
        const height = bound.bottom - bound.top + 1;
        const width = bound.right - bound.left + 1;
        const trimmed = ctx.getImageData(bound.left, bound.top, width, height);
        canvas.width = width;
        canvas.height = height;
        ctx.putImageData(trimmed, 0, 0);
    }
    getPixels(x, y, width, height, t) {
        const ctx = this.ctx;
        width ??= ctx.canvas.width;
        height ??= ctx.canvas.height;
        const data = ctx.getImageData(x, y, width, height).data;
        if (t === __1.ColorDataType.Rgba)
            return Array.from(data);
        return (0, gifsx_1.rgbaToHex)(Uint8Array.from(data), false, true);
    }
    setPixels(x, y, width, height, colors, t) {
        const ctx = this.ctx;
        width ??= ctx.canvas.width;
        height ??= ctx.canvas.height;
        const data = ctx.createImageData(width, height);
        if (t !== __1.ColorDataType.Rgba)
            data.data.set(Uint8ClampedArray.from((0, gifsx_1.hexToRgba)(colors)));
        else
            data.data.set(Uint8ClampedArray.from(colors));
        ctx.putImageData(data, x, y);
    }
    resize(width, height) {
        const ctx = this.ctx, data = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.canvas.width = width;
        ctx.canvas.height = height;
        ctx.putImageData(data, 0, 0);
    }
    dataUrl(mime) {
        return this.ctx.canvas.toDataURL(mime ?? 'image/png');
    }
    buffer(mime) {
        // @ts-ignore
        return this.ctx.canvas.toBuffer(mime ?? 'image/png');
    }
}
exports.CanvasBuilder = CanvasBuilder;

"use strict";
/*
* SPDX-License-Identifier: LGPL-3.0-or-later
* Copyright © 2026 BotForge
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.wordWidthCache = exports.charWidthCache = exports.CanvasBuilder = void 0;
const canvas_1 = require("@napi-rs/canvas");
const __1 = require("..");
const gifsx_1 = require("@gifsx/gifsx");
class CanvasBuilder {
    /**
     * The inner canvas.
     */
    inner;
    /**
     * The inner canvas context.
     */
    ctx;
    /**
     * ``CanvasBuilder`` Exclusive Properties.
     *
     * ## Rect & Image alignment
     *  - rectAlign: The horizontal alignment of the rectangle. Defaults to ``RectAlign.right``
     *  - rectBaseline: The vertical alignment of the rectangle. Defaults to ``RectBaseline.bottom``
     *
     * Both apply to ``CanvasBuilder.rect``, ``CanvasBuilder.drawImage``, ``CanvasBuilder.drawProgressBar``, and ``CanvasBuilder.drawPieChart``.
     */
    customProperties = {
        rectAlign: __1.RectAlign.right,
        rectBaseline: __1.RectBaseline.bottom
    };
    constructor(width, height) {
        this.inner = (0, canvas_1.createCanvas)(width, height);
        this.ctx = this.inner.getContext('2d');
    }
    get width() { return this.inner.width; }
    get height() { return this.inner.height; }
    set width(val) { this.resize(val, this.height); }
    set height(val) { this.resize(this.width, val); }
    /**
     * Draws a rectangle on the canvas.
     * @param type - The type of drawing operation to perform for the rectangle. (fill/stroke/clear)
     * @param x - The X coordinate of the of the rectangle.
     * @param y - The Y coordinate of the of the rectangle.
     * @param width - The width of the rectangle. ``canvas.width - x`` by default.
     * @param height - The height of the rectangle. ``canvas.height - y`` by default.
     * @param radius - The radius of the rounded corners. 0 by default.
     */
    rect(type, x, y, width, height, radius) {
        const ctx = this.ctx;
        width ??= this.inner.width - x;
        height ??= this.inner.height - y;
        radius ??= 0;
        [x, y] = this.align(x, y, width, height);
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
        ctx.beginPath();
        ctx.roundRect(x, y, width, height, radius);
        if (type === __1.FillOrStrokeOrClear.fill)
            ctx.fill();
        else if (type === __1.FillOrStrokeOrClear.stroke)
            ctx.stroke();
        else if (type === __1.FillOrStrokeOrClear.clear) {
            ctx.save();
            ctx.clip();
            ctx.clearRect(x, y, width, height);
            ctx.restore();
        }
        ;
    }
    ;
    /**
     * Draws text on the canvas.
     * @param type - Whether to fill or stroke the text.
     * @param spans - The text to draw, split into spans.
     * @param x - The X coordinate of the text.
     * @param y - The Y coordinate of the text.
     * @param font - The font to use for the text.
     * @param maxWidth - The maximum width of the text.
     * @param wrap - The text wrapping behavior. If not provided, doesn't wrap the text at all.
     * @param lineOffset - The vertical offset between lines of text.
     * @param nlBegin - The beginning position of new lines within the text. ``SKRSContext2D.textAlign`` by default.
     */
    text(type, spans, x, y, font, maxWidth, wrap, lineOffset, nlBegin) {
        if (!spans?.length || spans?.every(span => !span))
            return;
        const fontm = (0, __1.validateFont)(font);
        if (typeof fontm === 'string')
            throw new Error(fontm);
        const ctx = this.ctx, fontsize = Number.parseFloat(fontm[4]), imgsize = fontsize * 1.25, func = `${typeof type === 'number' ? __1.FillOrStroke[type] : type}Text`;
        lineOffset = fontsize * 0.25 - (lineOffset ?? 0);
        wrap ??= undefined;
        ctx.font = font;
        if (spans.length === 1 && wrap === null || wrap === undefined) {
            const span = spans[0];
            if (typeof span === 'string')
                ctx[func](span, x, y, maxWidth ?? undefined);
            else
                ctx.drawImage(span, x, y, Math.min(imgsize, maxWidth || imgsize), imgsize);
            return;
        }
        const lines = [[]];
        let lineWidth = 0;
        const cache = wrap === __1.TextWrap.character ? exports.charWidthCache : exports.wordWidthCache;
        let fontCache = cache.get(font);
        if (!fontCache) {
            fontCache = new Map();
            cache.set(font, fontCache);
        }
        let charFontCache = null;
        if (wrap === __1.TextWrap.smart) {
            charFontCache = cache.get(font);
            if (!charFontCache) {
                charFontCache = new Map();
                cache.set(font, charFontCache);
            }
        }
        for (const span of spans) {
            if (!span) {
                lines.push([]);
                lineWidth = 0;
                continue;
            }
            if (typeof span === 'string') {
                if (!maxWidth || wrap === undefined) {
                    lines[lines.length - 1].push({ item: span, w: ctx.measureText(span).width });
                    continue;
                }
                if (wrap === __1.TextWrap.character || wrap === __1.TextWrap['erase-character']) {
                    let line = '';
                    let current = 0;
                    for (const char of span) {
                        let charWidth = fontCache.get(char);
                        if (charWidth === undefined) {
                            charWidth = ctx.measureText(char).width;
                            fontCache?.set(char, charWidth);
                        }
                        if (lineWidth + current + charWidth > maxWidth) {
                            if (wrap === __1.TextWrap['erase-character'])
                                break;
                            lines[lines.length - 1].push({ item: line, w: current });
                            lines.push([]);
                            line = char;
                            current = charWidth;
                            lineWidth = 0;
                            continue;
                        }
                        line += char;
                        current += charWidth;
                    }
                    lines[lines.length - 1].push({ item: line, w: current });
                    lineWidth = current;
                }
                else {
                    for (const word of span.match(__1.wordRegex) ?? []) {
                        let wordWidth = fontCache.get(word);
                        if (wordWidth === undefined) {
                            wordWidth = ctx.measureText(word).width;
                            fontCache.set(word, wordWidth);
                        }
                        if (lineWidth + wordWidth > maxWidth) {
                            if (wrap === __1.TextWrap['erase-word'])
                                break;
                            if (wrap === __1.TextWrap.smart && wordWidth > maxWidth) {
                                if (lines[lines.length - 1].length) {
                                    lines.push([]);
                                    lineWidth = 0;
                                }
                                let line = '';
                                let current = 0;
                                for (const char of word) {
                                    let charWidth = charFontCache.get(char);
                                    if (charWidth === undefined) {
                                        charWidth = ctx.measureText(char).width;
                                        charFontCache.set(char, charWidth);
                                    }
                                    if (lineWidth + current + charWidth > maxWidth) {
                                        lines[lines.length - 1].push({ item: line, w: current });
                                        lines.push([]);
                                        line = char;
                                        current = charWidth;
                                        lineWidth = 0;
                                        continue;
                                    }
                                    line += char;
                                    current += charWidth;
                                }
                                lines[lines.length - 1].push({ item: line, w: current });
                                lineWidth = current;
                                continue;
                            }
                            lines.push([]);
                            lineWidth = 0;
                        }
                        lines[lines.length - 1].push({ item: word, w: wordWidth });
                        lineWidth += wordWidth;
                    }
                }
            }
            else {
                if (wrap !== undefined && maxWidth && (lineWidth + imgsize) > maxWidth && lineWidth) {
                    lines.push([]);
                    lineWidth = 0;
                }
                lines[lines.length - 1].push({ item: span, w: imgsize });
                lineWidth += imgsize;
            }
        }
        const baseline = ctx.textBaseline, imgyoffset = baseline === 'top' ? fontsize * 0.25
            : baseline === 'middle' ? imgsize * 0.5
                : fontsize;
        let align = ctx.textAlign;
        ctx.textAlign = 'left';
        let cy = y;
        for (const line of lines) {
            let linewidth = 0;
            for (let i = 0; i < line.length; i++) {
                linewidth += line[i].w;
            }
            let cx = align === 'center' ? x - linewidth / 2
                : (align === 'right' || align === 'end') ? x - linewidth
                    : x;
            for (const { item, w } of line) {
                if (typeof item === 'string')
                    (ctx[func])(item, cx, cy);
                else
                    ctx.drawImage(item, cx, cy - imgyoffset, imgsize, imgsize);
                cx += w;
            }
            cy += fontsize + lineOffset;
            if (nlBegin && nlBegin !== align) {
                x += ((nlBegin === 'right' || nlBegin === 'end' ? 1 : nlBegin === 'center' ? 0.5 : 0) -
                    (align === 'right' || align === 'end' ? 1 : align === 'center' ? 0.5 : 0)) * linewidth;
                align = nlBegin;
                nlBegin = null;
            }
        }
        ctx.textAlign = align;
    }
    /**
     * Draws an image on the canvas.
     * Works the same as ``SKRSContext2D.drawImage`` but also handles loading and radius for you.
     * @param manager - An ``ImageManager`` instance.
     * @param image - The image to draw.
     * @param x - The X coordinate of the image's starting point.
     * @param y - The Y coordinate of the image's starting point.
     * @param width - The width of the image. If not provided, defaults to the image's width.
     * @param height - The height of the image. If not provided, defaults to the image's height.
     * @param radius - The radius of the image's corners. If not provided, defaults to no rounding.
     */
    async drawImage(manager, image, x, y, width, height, radius, srcX, srcY, srcWidth, srcHeight) {
        const ctx = this.ctx;
        if (!(image instanceof canvas_1.Image))
            image = manager ? await manager.load(image)
                : await (0, canvas_1.loadImage)(image);
        width ??= image.width;
        height ??= image.height;
        [x, y] = this.align(x, y, width, height);
        const args = [x, y, width, height];
        if (typeof srcX === 'number') // @ts-ignore
            args.unshift(srcX, srcY, srcWidth, srcHeight);
        if (!radius)
            return ctx.drawImage(image, ...args);
        ctx.save();
        ctx.beginPath();
        ctx.roundRect(x, y, width, height, radius);
        ctx.clip();
        ctx.drawImage(image, ...args);
        ctx.restore();
    }
    /**
     * A helper function that draws a progress bar on the canvas.
     * @param x The X coordinate of the progress bar.
     * @param y The Y coordinate of the progress bar.
     * @param width The width of the progress bar.
     * @param height The height of the progress bar.
     * @param progress The progress value between 0 and 100.
     * @param config The configuration options for the progress bar.
     */
    drawProgressBar(x, y, width, height, progress, config = {}) {
        const ctx = this.ctx;
        progress = Math.min(progress || 0, 100) / 100;
        [x, y] = this.align(x, y, width, height);
        const { style = '#fff', type = 'fill', radius, direction = 'horizontal', clip = false, left, leftType = 'fill' } = config;
        const background = config.background ?? {};
        background.enabled ??= true;
        background.style ??= '#fff';
        if (background.enabled) {
            ctx[background.type === 'fill' ? 'fillStyle' : 'strokeStyle'] = background.style; // @ts-ignore
            this.rect(__1.FillOrStrokeOrClear[background.type ?? 'fill'], x, y, width, height, background.radius);
        }
        if (background.padding) {
            width -= background.padding * 2;
            height -= background.padding * 2;
            x += background.padding;
            y += background.padding;
        }
        const dir = direction === 'both';
        const pwidth = Math.min((!dir && direction === 'horizontal')
            ? width * progress : width, width);
        const pheight = Math.min((!dir && direction === 'vertical')
            ? height * progress : height, height);
        if (clip) {
            ctx.save();
            ctx.beginPath();
            ctx.roundRect(x, y, width, height, clip);
            ctx.clip();
        }
        if (left) {
            ctx[leftType === 'fill' ? 'fillStyle' : 'strokeStyle'] = left;
            this.rect(__1.FillOrStrokeOrClear[leftType], x, y, width, height, radius);
        }
        if (type !== 'clear')
            ctx[`${type}Style`] = style;
        this.rect(__1.FillOrStrokeOrClear[type], x, y, pwidth, pheight, radius);
        if (clip)
            ctx.restore();
        return [x, y, width, height, pwidth, pheight];
    }
    /**
     * A helper function that draws a pie chart on the canvas.
     * @param x The X coordinate of the chart.
     * @param y The Y coordinate of the chart.
     * @param width The width of the chart.
     * @param height The height of the chart.
     * @param data The data for the chart.
     * @param config The configuration options for the chart.
     */
    drawPieChart(x, y, width, height, data, config = {}) {
        const ctx = this.ctx;
        const background = config.background ?? {};
        background.enabled ??= true;
        background.style ??= '#fff';
        [x, y] = this.align(x, y, width, height);
        if (background.enabled)
            this.rect(// @ts-ignore
            __1.FillOrStrokeOrClear[background.type ?? 'fill'], x, y, width, height, background.radius);
        if (background.padding) {
            width -= background.padding * 2;
            height -= background.padding * 2;
            x += background.padding;
            y += background.padding;
        }
        const total = data.reduce((acc, val) => acc + val.value, 0);
        if (total <= 0)
            return;
        const cx = x + width / 2, cy = y + height / 2, r = Math.min(width, height) / 2, sf = (Math.PI * 2) / total;
        let prev = 0;
        for (const seg of data) {
            if (!seg.value)
                continue;
            const angle = seg.value * sf + prev;
            ctx.beginPath();
            ctx.arc(cx, cy, r, prev, angle);
            if (r)
                ctx.arc(cx, cy, r, angle, prev, true);
            else
                ctx.lineTo(cx, cy);
            ctx.closePath();
            ctx.fillStyle = seg.style;
            ctx.fill();
            prev = angle;
        }
    }
    /**
     * Adds/sets/removes a filter of the canvas.
     * @param method - The method AKA filter action to perform.
     * @param filter - The filter to add, set, or remove.
     * @param value - The value of the filter.
     */
    filter(method, filter, value) {
        const ctx = this.ctx;
        const f = typeof filter === 'number' ? __1.Filters[filter] : filter, unit = filter === __1.Filters.grayscale || filter === __1.Filters.sepia ? '%' :
            (filter === __1.Filters.blur ? 'px' : ''), fstr = ` ${f}(${value}${unit})`;
        switch (method) {
            case __1.FilterMethod.add: {
                if (!f || !value)
                    throw new Error(__1.ForgeCanvasError.NoFilterOrValue);
                ctx.filter = ctx.filter !== 'none' ? ctx.filter += fstr : fstr;
                return;
            }
            case __1.FilterMethod.set: {
                if (!f || !value)
                    throw new Error(__1.ForgeCanvasError.NoFilterOrValue);
                ctx.filter = fstr;
                return;
            }
            case __1.FilterMethod.remove: {
                if (!f)
                    throw new Error(__1.ForgeCanvasError.NoFilter);
                const filters = (0, __1.parseFilters)(ctx.filter).filter(x => x.filter !== f);
                ctx.filter = filters.length ? filters.map(x => x.raw).join(' ') : 'none';
                return;
            }
            case __1.FilterMethod.clear: {
                ctx.filter = 'none';
                return;
            }
            case __1.FilterMethod.get: return ctx.filter;
            case __1.FilterMethod.json: return (0, __1.parseFilters)(ctx.filter);
            case __1.FilterMethod.setRaw: {
                if (!value)
                    throw new Error(__1.ForgeCanvasError.NoFilterOrValue);
                ctx.filter = value;
                return;
            }
        }
    }
    /**
     * Sets the canvas rotation angle.
     * @param angle The angle in degrees.
     */
    rotate(angle) {
        const ctx = this.ctx;
        const centerX = this.inner.width / 2;
        const centerY = this.inner.height / 2;
        ctx.translate(centerX, centerY);
        ctx.rotate((angle * Math.PI) / 180);
        ctx.translate(-centerX, -centerY);
    }
    /**
     * Trims the canvas by resizing the canvas only for the visible area.
     */
    trim(tTop = true, tLeft = true, tRight = true, tBottom = true) {
        if (!tTop && !tLeft && !tRight && !tBottom)
            return;
        const { width, height } = this.inner, ctx = this.ctx, data = new Uint32Array(this.inner.data().buffer);
        let top = 0, bottom = height - 1, left = 0, right = width - 1;
        if (tTop) {
            while (top < height && CanvasBuilder.checkRow(data, top, width))
                top++;
            if (top > bottom)
                return;
        }
        if (tBottom)
            while (bottom > top && CanvasBuilder.checkRow(data, bottom, width))
                bottom--;
        if (tLeft)
            while (left < width && CanvasBuilder.checkColumn(data, left, top, bottom, width))
                left++;
        if (tRight)
            while (right > left && CanvasBuilder.checkColumn(data, right, top, bottom, width))
                right--;
        right -= left - 1;
        bottom -= top - 1;
        if (right === width && bottom === height)
            return;
        const trimmed = ctx.getImageData(left, top, right, bottom);
        this.inner.width = right;
        this.inner.height = bottom;
        ctx.putImageData(trimmed, 0, 0);
    }
    static checkRow(data, y, width) {
        const start = y * width, end = start + width;
        for (let i = start; i < end; i++)
            if (data[i])
                return false;
        return true;
    }
    static checkColumn(data, x, top, bottom, width) {
        let i = top * width + x;
        const end = bottom * width + x;
        while (i <= end) {
            if (data[i])
                return false;
            i += width;
        }
        return true;
    }
    /** Returns an array of pixels at a rectangle */
    getPixels(x, y, width, height, t) {
        const ctx = this.ctx;
        width ??= this.inner.width;
        height ??= this.inner.height;
        const data = ctx.getImageData(x, y, width, height).data;
        if (t === __1.ColorDataType.Rgba)
            return Array.from(data);
        return (0, gifsx_1.rgbaToHex)(Uint8Array.from(data), false, true);
    }
    /** Returns an array of pixels at a rectangle */
    setPixels(x, y, width, height, colors, t) {
        const ctx = this.ctx;
        width ??= this.inner.width;
        height ??= this.inner.height;
        const data = ctx.createImageData(width, height);
        if (t !== __1.ColorDataType.Rgba)
            data.data.set(Uint8ClampedArray.from((0, gifsx_1.hexToRgba)(colors)));
        else
            data.data.set(Uint8ClampedArray.from(colors));
        ctx.putImageData(data, x, y);
    }
    /** Resizes the canvas */
    resize(width, height) {
        const ctx = this.ctx, canvas = this.inner, data = ctx.getImageData(0, 0, width, height);
        canvas.width = width;
        canvas.height = height;
        ctx.putImageData(data, 0, 0);
    }
    /** Calculates the alignment coordinates */
    align(x, y, width, height) {
        const { rectAlign, rectBaseline } = this.customProperties;
        return [
            rectAlign === __1.RectAlign.center ? x - width / 2 :
                rectAlign === __1.RectAlign.left ? x - width : x,
            rectBaseline === __1.RectBaseline.center ? y - height / 2 :
                rectBaseline === __1.RectBaseline.top ? y - height : y
        ];
    }
    async dataUrl(format) {
        return this.inner.toDataURLAsync('image/' + (typeof format === 'number' ? __1.ImageFormat[format] : format) ?? 'png');
    }
    buffer(format) {
        return this.inner.toBuffer('image/' + (typeof format === 'number' ? __1.ImageFormat[format] : format) ?? 'png');
    }
    async encode(format) {
        return this.inner.encode((typeof format === 'number' ? __1.ImageFormat[format] : format));
    }
}
exports.CanvasBuilder = CanvasBuilder;
exports.charWidthCache = new Map();
exports.wordWidthCache = new Map();

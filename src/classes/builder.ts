/*
* SPDX-License-Identifier: LGPL-3.0-or-later
* Copyright © 2026 BotForge
*/

import { Canvas, createCanvas, Image, loadImage, SKRSContext2D } from '@napi-rs/canvas';
import {
    FillOrStroke,
    FillOrStrokeOrClear,
    FilterMethod,
    Filters,
    validateFont,
    parseFilters,
    ProgressBarOptions,
    ColorDataType,
    PieChartOptions,
    BarData,
    ForgeCanvasError,
    RectAlign,
    RectBaseline,
    TextWrap,
    Spans,
    CanvasBuilderCustomProperties,
    wordRegex,
    ImageFormat,
    ImageManager,
} from '..';
import { hexToRgba, rgbaToHex } from '@gifsx/gifsx';

export class CanvasBuilder {
    /**
     * The inner canvas.
     */
    public inner: Canvas;
    
    /**
     * The inner canvas context.
     */
    public ctx: SKRSContext2D;

    /**
     * ``CanvasBuilder`` Exclusive Properties.
     *
     * ## Rect & Image alignment
     *  - rectAlign: The horizontal alignment of the rectangle. Defaults to ``RectAlign.right``
     *  - rectBaseline: The vertical alignment of the rectangle. Defaults to ``RectBaseline.bottom``
     *
     * Both apply to ``CanvasBuilder.rect``, ``CanvasBuilder.drawImage``, ``CanvasBuilder.drawProgressBar``, and ``CanvasBuilder.drawPieChart``.
     */
    public customProperties: CanvasBuilderCustomProperties = {
        rectAlign: RectAlign.right,
        rectBaseline: RectBaseline.bottom
    };

    constructor(width: number, height: number) {
        this.inner = createCanvas(width, height);
        this.ctx = this.inner.getContext('2d');
    }

    public get width() { return this.inner.width }
    public get height() { return this.inner.height }
    public set width(val: number) { this.resize(val, this.height) }
    public set height(val: number) { this.resize(this.width, val) }

    /**
     * Draws a rectangle on the canvas.
     * @param type - The type of drawing operation to perform for the rectangle. (fill/stroke/clear)
     * @param x - The X coordinate of the of the rectangle.
     * @param y - The Y coordinate of the of the rectangle.
     * @param width - The width of the rectangle. ``canvas.width - x`` by default.
     * @param height - The height of the rectangle. ``canvas.height - y`` by default.
     * @param radius - The radius of the rounded corners. 0 by default.
     */
    public rect(
        type: FillOrStrokeOrClear,
        x: number,
        y: number,
        width?: number | null,
        height?: number | null,
        radius?: number | number[] | null
    ) {
        const ctx = this.ctx;
        width ??= this.inner.width - x;
        height ??= this.inner.height - y;
        radius ??= 0;
        [x, y] = this.align(x, y, width, height);

        if (type === FillOrStrokeOrClear.none)
            return ctx.roundRect(x, y, width, height, radius);

        if (!radius) {
            if (type === FillOrStrokeOrClear.fill) ctx.fillRect(x, y, width, height);
            else if (type === FillOrStrokeOrClear.stroke) ctx.strokeRect(x, y, width, height);
            else ctx.clearRect(x, y, width, height);
            return;
        }

        ctx.beginPath();
        ctx.roundRect(x, y, width, height, radius);

        if (type === FillOrStrokeOrClear.fill) ctx.fill();
        else if (type === FillOrStrokeOrClear.stroke) ctx.stroke();
        else if (type === FillOrStrokeOrClear.clear) {
            ctx.save();
            ctx.clip();
            ctx.clearRect(x, y, width, height);
            ctx.restore();
        };
    };

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
    public text(
        type: FillOrStroke,
        spans: Spans,
        x: number,
        y: number,
        font: string,
        maxWidth?: number | null,
        wrap?: TextWrap | null,
        lineOffset?: number | null,
        nlBegin?: CanvasTextAlign | null
    ) {
        if (!spans?.length || spans?.every(span => !span))
            return;

        const fontm = validateFont(font);
        if (typeof fontm === 'string') throw new Error(fontm);

        const ctx = this.ctx,
            fontsize = Number.parseFloat(fontm[4]),
            imgsize = fontsize * 1.25,
            func = `${typeof type === 'number' ? FillOrStroke[type] : type}Text` as 'strokeText' | 'fillText';

        lineOffset = fontsize * 0.25 - (lineOffset ?? 0);
        wrap ??= undefined;

        ctx.font = font;

        if (spans.length === 1 && wrap === null || wrap === undefined) {
            const span = spans[0]!;
            if (typeof span === 'string')
                ctx[func](span, x, y, maxWidth ?? undefined);
            else ctx.drawImage(span, x, y, Math.min(imgsize, maxWidth || imgsize), imgsize);
            return;
        }

        const lines: { item: string | Image, w: number }[][] = [[]];
        let lineWidth = 0;

        const cache = wrap === TextWrap.character ? charWidthCache : wordWidthCache;
        
        let fontCache = cache.get(font);
        if (!fontCache) {
            fontCache = new Map();
            cache.set(font, fontCache);
        }

        let charFontCache: Map<string, number> = null!;
        if (wrap === TextWrap.smart) {
            charFontCache = cache.get(font)!;
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

                if (wrap === TextWrap.character || wrap === TextWrap['erase-character']) {
                    let line = '';
                    let current = 0;
                    for (const char of span) {
                        let charWidth = fontCache.get(char);
                        if (charWidth === undefined) {
                            charWidth = ctx.measureText(char).width;
                            fontCache?.set(char, charWidth);
                        }

                        if (lineWidth + current + charWidth > maxWidth) {
                            if (wrap === TextWrap['erase-character']) break;
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
                } else {
                    for (const word of span.match(wordRegex) ?? []) {
                        let wordWidth = fontCache.get(word);
                        if (wordWidth === undefined) {
                            wordWidth = ctx.measureText(word).width;
                            fontCache.set(word, wordWidth);
                        }

                        if (lineWidth + wordWidth > maxWidth) {
                            if (wrap === TextWrap['erase-word']) break;
                            if (wrap === TextWrap.smart && wordWidth > maxWidth) {
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
            } else {
                if (wrap !== undefined && maxWidth && (lineWidth + imgsize) > maxWidth && lineWidth) {
                    lines.push([]);
                    lineWidth = 0;
                }

                lines[lines.length - 1].push({ item: span, w: imgsize });
                lineWidth += imgsize;
            }
        }

        const baseline = ctx.textBaseline,
            imgyoffset = baseline === 'top' ? fontsize * 0.25
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
                if (typeof item === 'string') (ctx[func])(item, cx, cy);
                else ctx.drawImage(item, cx, cy - imgyoffset, imgsize, imgsize);
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
     * @param x - The X coordinate of the image's destination starting point.
     * @param y - The Y coordinate of the image's destination starting point.
     * @param width - The width of the drawn image. If not provided, defaults to ``srcWidth`` or the image's width.
     * @param height - The height of the drawn image. If not provided, defaults to ``srcHeight`` or the image's height.
     * @param radius - The radius of the drawn image's corners. If not provided, defaults to no rounding.
     * @param srcX - The X coordinate of the image area's starting point.
     * @param srcY - The Y coordinate of the image area's starting point.
     * @param srcWidth - The width of the image area. If not provided, defaults to the ``width``.
     * @param srcHeight - The height of the image area. If not provided, defaults to ``height``.
     */
    public async drawImage(
        manager: ImageManager | null,
        image: string | Buffer | Uint8Array | Image | ArrayBufferLike | URL,
        x: number,
        y: number,
        width?: number | null,
        height?: number | null,
        radius?: number | number[] | null,
        srcX?: number | null,
        srcY?: number | null,
        srcWidth?: number | null,
        srcHeight?: number | null
    ) {
        const ctx = this.ctx;

        if (!(image instanceof Image))
            image = manager ? await manager.load(image)
                : await loadImage(image);

        width ??= srcWidth ?? image.width;
        height ??= srcHeight ?? image.height;
        [x, y] = this.align(x, y, width, height);

        const args = [x, y, width, height] as const;
        if (typeof srcX === 'number') // @ts-ignore
            args.unshift(srcX, srcY, srcWidth ?? width, srcHeight ?? height);

        if (!radius) return ctx.drawImage(image, ...args);

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
    public drawProgressBar(
        x: number,
        y: number,
        width: number,
        height: number,
        progress: number,
        config: ProgressBarOptions = {}
    ) {
        const ctx = this.ctx;
        progress = Math.min(progress || 0, 100) / 100;
        [x, y] = this.align(x, y, width, height);
        const {
            style = '#fff',
            type = 'fill',
            radius,
            direction = 'horizontal',
            clip = false,
            left,
            leftType = 'fill'
        } = config;
        const background = config.background ?? {} as any;

        background.enabled ??= true;
        background.style ??= '#fff';

        if (background.enabled) {
            ctx[background.type === 'fill' ? 'fillStyle' : 'strokeStyle'] = background.style; // @ts-ignore
            this.rect(FillOrStrokeOrClear[background.type ?? 'fill'], x, y, width, height, background.radius);
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
            ctx.roundRect(
                x, y,
                width,
                height,
                clip
            );
            ctx.clip();
        }

        if (left) {
            ctx[leftType === 'fill' ? 'fillStyle' : 'strokeStyle'] = left;
            this.rect(FillOrStrokeOrClear[leftType], x, y, width, height, radius);
        }

        if (type !== 'clear') ctx[`${type}Style`] = style;
        this.rect(FillOrStrokeOrClear[type], x, y, pwidth, pheight, radius);
        if (clip) ctx.restore();

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
    public drawPieChart(
        x: number,
        y: number,
        width: number,
        height: number,
        data: BarData[],
        config: PieChartOptions = {}
    ) {
        const ctx = this.ctx;
        const background = config.background ?? {} as any;
        background.enabled ??= true;
        background.style ??= '#fff';

        [x, y] = this.align(x, y, width, height);

        if (background.enabled)
            this.rect( // @ts-ignore
                FillOrStrokeOrClear[background.type ?? 'fill'],
                x, y, width, height, background.radius
            );

        if (background.padding) {
            width -= background.padding * 2;
            height -= background.padding * 2;
            x += background.padding;
            y += background.padding;
        }

        const total = data.reduce((acc, val) => acc + val.value, 0);
        if (total <= 0) return;

        const cx = x + width / 2,
            cy = y + height / 2,
            r = Math.min(width, height) / 2,
            sf = (Math.PI * 2) / total;

        let prev = 0;
        for (const seg of data) {
            if (!seg.value) continue;
            const angle = seg.value * sf + prev;

            ctx.beginPath();

            ctx.arc(cx, cy, r, prev, angle);
            if (r) ctx.arc(cx, cy, r, angle, prev, true);
            else ctx.lineTo(cx, cy);

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
    public filter(
        method: FilterMethod,
        filter?: Filters | null,
        value?: string | null
    ) {
        const ctx = this.ctx;

        const f = typeof filter === 'number' ? Filters[filter] : filter,
            unit = filter === Filters.grayscale || filter === Filters.sepia ? '%' :
                (filter === Filters.blur ? 'px' : ''),
            fstr = ` ${f}(${value}${unit})`;

        switch (method) {
            case FilterMethod.add: {
                if (!f || !value) throw new Error(ForgeCanvasError.NoFilterOrValue);
                ctx.filter = ctx.filter !== 'none' ? ctx.filter += fstr : fstr;
                return;
            }
            case FilterMethod.set: {
                if (!f || !value) throw new Error(ForgeCanvasError.NoFilterOrValue);
                ctx.filter = fstr;
                return;
            }
            case FilterMethod.remove: {
                if (!f) throw new Error(ForgeCanvasError.NoFilter);
                const filters = parseFilters(ctx.filter).filter(x => x.filter !== f);
                ctx.filter = filters.length ? filters.map(x => x.raw).join(' ') : 'none';
                return;
            }
            case FilterMethod.clear: {
                ctx.filter = 'none';
                return;
            }
            case FilterMethod.get: return ctx.filter;
            case FilterMethod.json: return parseFilters(ctx.filter);
            case FilterMethod.setRaw: {
                if (!value) throw new Error(ForgeCanvasError.NoFilterOrValue);
                ctx.filter = value;
                return;
            }
        }
    }

    /**
     * Sets the canvas rotation angle.
     * @param angle The angle in degrees.
     */
    public rotate(angle: number) {
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
    public trim(
        tTop: boolean = true,
        tLeft: boolean = true,
        tRight: boolean = true,
        tBottom: boolean = true
    ) {
        if (!tTop && !tLeft && !tRight && !tBottom) return;
        const { width, height } = this.inner,
              ctx = this.ctx,
              data = new Uint32Array(this.inner.data().buffer);

        let top = 0,
            bottom = height - 1,
            left = 0,
            right = width - 1;

        if (tTop) {
            while (top < height && CanvasBuilder.checkRow(data, top, width)) top++;
            if (top > bottom) return;
        }

        if (tBottom) while (bottom > top && CanvasBuilder.checkRow(data, bottom, width)) bottom--;

        if (tLeft) while (left < width && CanvasBuilder.checkColumn(data, left, top, bottom, width))
            left++;
        if (tRight) while (right > left && CanvasBuilder.checkColumn(data, right, top, bottom, width))
            right--;

        right -= left - 1;
        bottom -= top - 1;
        if (right === width && bottom === height) return;

        const trimmed = ctx.getImageData(left, top, right, bottom);
        this.inner.width = right;
        this.inner.height = bottom;
        ctx.putImageData(trimmed, 0, 0);
    }

    private static checkRow(data: Uint32Array, y: number, width: number): boolean {
        const start = y * width,
              end = start + width;
        for (let i = start; i < end; i++)
            if (data[i]) return false;
        return true;
    }

    private static checkColumn(data: Uint32Array, x: number, top: number, bottom: number, width: number): boolean {
        let i = top * width + x;
        const end = bottom * width + x;
        
        while (i <= end) {
            if (data[i]) return false;
            i += width;
        }
        return true;
    }

    /** Returns an array of pixels at a rectangle */
    public getPixels<T extends ColorDataType>(
        x: number,
        y: number,
        width: number,
        height: number,
        t?: T | null
    ): T extends ColorDataType.Rgba ? number[] : string[] {
        const ctx = this.ctx;
        width ??= this.inner.width;
        height ??= this.inner.height;

        const data = ctx.getImageData(x, y, width, height).data;
        if (t === ColorDataType.Rgba)
            return Array.from(data) as T extends ColorDataType.Rgba ? number[] : string[];

        return rgbaToHex(
            Uint8Array.from(data), false, true
        ) as T extends ColorDataType.Rgba ? number[] : string[];
    }

    /** Returns an array of pixels at a rectangle */
    public setPixels<T extends ColorDataType>(
        x: number,
        y: number,
        width: number,
        height: number,
        colors: T extends ColorDataType.Rgba
            ? number[] : string[],
        t?: T | null
    ) {
        const ctx = this.ctx;
        width ??= this.inner.width;
        height ??= this.inner.height;

        const data = ctx.createImageData(width, height);

        if (t !== ColorDataType.Rgba)
            data.data.set(Uint8ClampedArray.from(hexToRgba(colors as string[])));
        else data.data.set(Uint8ClampedArray.from(colors as number[]));

        ctx.putImageData(data, x, y);
    }

    /** Resizes the canvas */
    public resize(width: number, height: number) {
        const ctx = this.ctx,
              canvas = this.inner,
              data = ctx.getImageData(0, 0, width, height);

        canvas.width = width;
        canvas.height = height;
        ctx.putImageData(data, 0, 0);
    }

    /** Calculates the alignment coordinates */
    public align(x: number, y: number, width: number, height: number): [number, number] {
        const { rectAlign, rectBaseline } = this.customProperties;
        return [
            rectAlign === RectAlign.center ? x - width / 2 :
                rectAlign === RectAlign.left ? x - width : x,
            rectBaseline === RectBaseline.center ? y - height / 2 :
                rectBaseline === RectBaseline.top ? y - height : y
        ];
    }

    public async dataUrl(format?: ImageFormat | null) { // @ts-ignore
        return this.inner.toDataURLAsync('image/' + (typeof format === 'number' ? ImageFormat[format] : format) ?? 'png');
    }
    public buffer(format?: ImageFormat | null) { // @ts-ignore
        return this.inner.toBuffer('image/' + (typeof format === 'number' ? ImageFormat[format] : format) ?? 'png');
    }
    public async encode(format?: ImageFormat | null) {
        return this.inner.encode((typeof format === 'number' ? ImageFormat[format] : format) as any);
    }
}

export const charWidthCache = new Map<string, Map<string, number>>();
export const wordWidthCache = new Map<string, Map<string, number>>();
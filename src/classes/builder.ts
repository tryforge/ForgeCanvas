import {
    createCanvas,
    loadImage,
    SKRSContext2D,
    Image
} from '@napi-rs/canvas';
import {
    CustomCanvasProperties,
    FillOrStroke,
    FillOrStrokeOrClear,
    FilterMethod,
    Filters,
    fontRegex,
    CanvasUtil,
    ProgressBarOptions,
    ColorDataType,
    PieChartOptions,
    BarData
} from '..';
import { hexToRgba, rgbaToHex } from '@gifsx/gifsx';

export class CanvasBuilder {
    public ctx: SKRSContext2D;
    public util = CanvasUtil;

    public customProperties: CustomCanvasProperties = {};
    
    public get width() { return this.ctx.canvas.width };
    public get height() { return this.ctx.canvas.height };
    public set width(val: number) { this.resize(val, this.height) };
    public set height(val: number) { this.resize(this.width, val) };

    constructor(width: number, height: number) {
        this.ctx = createCanvas(width, height).getContext('2d');
    };

    public rect(
        type: FillOrStrokeOrClear,
        x: number,
        y: number,
        width?: number | null,
        height?: number | null,
        radius?: number | number[] | null
    ) {
        const ctx = this.ctx;
        width??= ctx.canvas.width - x;
        height??= ctx.canvas.height - y;
        radius??= 0;

        if (this.customProperties.rectAlign)
            x = CanvasUtil.calculateRectAlignOrBaseline(x, width, this.customProperties.rectAlign);
        if (this.customProperties.rectBaseline)
            y = CanvasUtil.calculateRectAlignOrBaseline(y, height, this.customProperties.rectBaseline);

        if (type === FillOrStrokeOrClear.none)
            return ctx.roundRect(x, y, width, height, radius);

        if (!radius) {
            if (type === FillOrStrokeOrClear.fill) ctx.fillRect(x, y, width, height);
            if (type === FillOrStrokeOrClear.stroke) ctx.strokeRect(x, y, width, height);
            if (type === FillOrStrokeOrClear.clear) ctx.clearRect(x, y, width, height);
            return;
        };

        ctx.save();
        ctx.beginPath();
        ctx.roundRect(x, y, width, height, radius);

        ({
            [FillOrStrokeOrClear.clear]: () => (ctx.clip(), ctx.clearRect(x, y, width, height)),
            [FillOrStrokeOrClear.fill]: () => ctx.fill(),
            [FillOrStrokeOrClear.stroke]: () => ctx.stroke()
        })[type]();

        ctx.restore();
    };

    public text(
        type: FillOrStroke,
        text: string,
        x: number,
        y: number,
        font: string,
        maxWidth?: number | null,
        multiline?: boolean | null,
        wrap?: boolean | null,
        lineOffset?: number | null
    ) {
        const ctx = this.ctx,
            oldfont = ctx.font,
            fontsize = parseFloat((fontRegex.exec(font) as RegExpExecArray)[4]),
            lines = multiline ? text.split('\n') : [text],
            func = (text: string, x: number, y: number, maxWidth?: number) =>
                type === FillOrStroke.fill 
                ? ctx.fillText(text, x, y, maxWidth)
                : ctx.strokeText(text, x, y, maxWidth);
        let offset = y;
        maxWidth??= undefined;

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
                        } else line += word + ' ';
                    });
                
                    func(line, x, offset, maxWidth);
                    offset += fontsize + (lineOffset ?? 0);
                } else {
                    func(t, x, offset, maxWidth);
                    offset += fontsize + (lineOffset ?? 0);
                };
            });
        } else func(text, x, y, maxWidth);
        ctx.font = oldfont;
    };

    public async drawImage(
        image: string | Buffer | Uint8Array | Image | ArrayBufferLike | URL,
        x: number,
        y: number,
        width?: number | null,
        height?: number | null,
        radius?: number | number[] | null
    ) {
        const ctx = this.ctx;
        image = await loadImage(image);
        width??= image.width;
        height??= image.height;

        if (this.customProperties.rectAlign)
            x = CanvasUtil.calculateRectAlignOrBaseline(x, width, this.customProperties.rectAlign);
        if (this.customProperties.rectBaseline)
            y = CanvasUtil.calculateRectAlignOrBaseline(y, height, this.customProperties.rectBaseline);

        if (!radius)
          return ctx.drawImage(image, x, y, width, height);

        ctx.save();
        ctx.beginPath();
        ctx.roundRect(x, y, width, height, radius);
        ctx.clip();
        ctx.drawImage(image, x, y, width, height);
        ctx.restore();
    };

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
            x = CanvasUtil.calculateRectAlignOrBaseline(x, width, this.customProperties.rectAlign);
        if (this.customProperties.rectBaseline)
            y = CanvasUtil.calculateRectAlignOrBaseline(y, height, this.customProperties.rectBaseline);

        if (options.background.enabled) {
            if (options.background.type !== 'clear') {
                ctx.save();
                ctx[`${options.background.type}Style` as 'fillStyle' | 'strokeStyle'] = options.background.style;

                ctx.beginPath();
                ctx.roundRect(x, y, width, height, options.background.radius);

                ctx[options.background.type as 'fill' | 'stroke']();
                ctx.restore();
            } else this.rect(FillOrStrokeOrClear.clear, x, y, width, height, options.background.radius);
        };

        if (options.background.padding) {
            width = width - options.background.padding * 2;
            height = height - options.background.padding * 2;
            x = x + options.background.padding;
            y = y + + options.background.padding;
        };

        const pwidth = Math.min(['horizontal', 'both'].includes(options.direction)
            ? width * progress : width, width);
        const pheight = Math.min(['vertical', 'both'].includes(options.direction)
            ? height * progress : height, height);

        if (options.type === 'clear')
            return (this.rect(FillOrStrokeOrClear.clear, x, y, pwidth, pheight, options.radius), [x, y, width, height, pwidth, pheight]);

        ctx.save();

        if (options.clip !== undefined) {
            ctx.beginPath();
            ctx.roundRect(
                x,
                y,
                width,
                height,
                options.clip
            );
            ctx.clip();
        };

        if (options.left) {
            ctx.fillStyle = options.left;
            ctx.beginPath();
            ctx.roundRect(x, y, width, height, options.radius);
            ctx.fill();
        };

        ctx[`${options.type}Style` as 'fillStyle' | 'strokeStyle'] = options.style;

        ctx.beginPath();
        ctx.roundRect(x, y, pwidth, pheight, options.radius);

        ctx[options.type as 'fill' | 'stroke']();
        ctx.restore();

        return [x, y, width, height, pwidth, pheight]
    };

    public drawPieChart(
        x: number,
        y: number,
        width: number,
        height: number,
        data: BarData[],
        config: PieChartOptions = {}
    ) {
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
            x = CanvasUtil.calculateRectAlignOrBaseline(x, width, this.customProperties.rectAlign);
        if (this.customProperties.rectBaseline)
            y = CanvasUtil.calculateRectAlignOrBaseline(y, height, this.customProperties.rectBaseline);

        if (options.background.enabled) {
            if (options.background.type !== 'clear') {
                ctx.save();
                ctx[`${options.background.type}Style` as 'fillStyle' | 'strokeStyle'] = options.background.style;

                ctx.beginPath();
                ctx.roundRect(x, y, width, height, options.background.radius);

                ctx[options.background.type as 'fill' | 'stroke']();
                ctx.restore();
            } else this.rect(FillOrStrokeOrClear.clear, x, y, width, height, options.background.radius);
        };

        if (options.background.padding) {
            width = width - options.background.padding * 2;
            height = height - options.background.padding * 2;
            x = x + options.background.padding;
            y = y + options.background.padding;
        };

        const total = data.reduce((acc, val) => acc + val.value, 0);
        let angle = 0;

        data.forEach((seg) => {
            const angl = angle + (seg.value / total) * Math.PI * 2;

            ctx.save();
            ctx.beginPath();
            ctx.moveTo(x + width / 2, y + height / 2);

            ctx.arc(
                x + width / 2, y + height / 2,
                Math.min(width, height) / 2,
                angle, angl
            );
            ctx.arc(
                x + width / 2, y + height / 2,
                options.radius ?? 0,
                angl, angle, true
            );

            ctx.lineTo(x + width / 2, y + height / 2);
            ctx.closePath();
            
            ctx.fillStyle = seg.style;
            ctx.fill();

            ctx.restore();
            angle = angl;
        });
    };

    public measureText(text: string, font: string) {
        const ctx = this.ctx,
              oldcolor = ctx.fillStyle,
              oldfont = ctx.font;
        
        ctx.fillStyle = '#000000';
        ctx.font = font;
        
        const metrics = ctx.measureText(text);
    
        ctx.fillStyle = oldcolor;
        ctx.font = oldfont;
    
        return metrics;
    };

    public filter<T extends FilterMethod>(
        method: T,
        filter?: Filters | null,
        value?: string | null
    ): T extends FilterMethod.get ? string
        : T extends FilterMethod.json ? { filter: string, value: string, raw: string }[] : void
    {
        const ctx = this.ctx;
    
        if (filter && typeof filter === 'string')
            filter = Filters[filter] as unknown as Filters;

        const PxOrPerc =
            filter === Filters.grayscale || filter === Filters.sepia ? '%' : 
                (filter === Filters.blur ? 'px' : '');

        if (method === FilterMethod.add) {
            if (!filter || !value) throw new Error('No filter or value provided');
            const result = CanvasUtil.parseFilters(
                (ctx.filter === 'none' ? '' : ctx.filter)
                 + `${Filters[filter]}(${value + PxOrPerc})`);
            ctx.filter = result?.map(x => x?.raw)?.join(' ')?.trim() || 'none';
        } else if (method === FilterMethod.set) {
            if (!filter || !value) throw new Error('No filter or value provided');
            ctx.filter = `${Filters[filter]}(${value + PxOrPerc})`;
        } else if (method === FilterMethod.remove) {
            if (!filter) throw new Error('No filter provided');
        
            let filters = CanvasUtil.parseFilters(ctx.filter);
            const index = filters.findIndex((obj) => obj?.filter === Filters[filter]);
    
            if (index !== -1)
                filters.splice(index, 1);
    
            ctx.filter = filters.length > 0 ? filters?.map(x => x?.raw)?.join(' ')?.trim() : 'none';
        } else if (method === FilterMethod.clear)
            ctx.filter = 'none';
        else if (method === FilterMethod.get)
            return ctx.filter as any;
        else if (method === FilterMethod.json)
            return CanvasUtil.parseFilters(ctx.filter) as any;
        return undefined as any;
    };

    public rotate(angle: number) {
        const ctx = this.ctx;
    
        const centerX = ctx.canvas.width / 2;
        const centerY = ctx.canvas.height / 2;
    
        ctx.translate(centerX, centerY);
        ctx.rotate((angle * Math.PI) / 180);
        ctx.translate(-centerX, -centerY);
    };
    
    public trim() {
        let ctx = this.ctx,
            canvas = ctx.canvas,
            pixels = ctx.getImageData(0, 0, canvas.width, canvas.height),
            l = pixels.data.length,
            i,
            bound = {
                top: canvas.height,
                left: canvas.width,
                right: 0,
                bottom: 0
            },
            x, y;
    
        for (i = 0; i < l; i += 4) {
            if (pixels.data[i + 3] === 0)
                continue;
    
            x = (i / 4) % canvas.width;
            y = Math.floor((i / 4) / canvas.width);
    
            if (x < bound.left) bound.left = x;
            if (y < bound.top) bound.top = y;
            if (y > bound.bottom) bound.bottom = y;
            if (x > bound.right) bound.right = x;
        };
    
        const height = bound.bottom - bound.top + 1;
        const width = bound.right - bound.left + 1;
        const trimmed = ctx.getImageData(bound.left, bound.top, width, height);
    
        canvas.width = width;
        canvas.height = height;
    
        ctx.putImageData(trimmed, 0, 0);
    };
    
    public getPixels<T extends ColorDataType>(
        x: number,
        y: number,
        width: number,
        height: number,
        t?: T | null
    ): T extends ColorDataType.Rgba ? number[] : string[]
    {
        const ctx = this.ctx;
        width??= ctx.canvas.width;
        height??= ctx.canvas.height;
    
        const data = ctx.getImageData(x, y, width, height).data;
        if (t === ColorDataType.Rgba)
            return Array.from(data) as T extends ColorDataType.Rgba ? number[] : string[];

        return rgbaToHex(Uint8Array.from(data), false, true) as T extends ColorDataType.Rgba ? number[] : string[];
    };
    
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
        width??= ctx.canvas.width;
        height??= ctx.canvas.height;
    
        const data = ctx.createImageData(width, height);
    
        if (t !== ColorDataType.Rgba)
            data.data.set(Uint8ClampedArray.from(hexToRgba(colors as string[])));
        else data.data.set(Uint8ClampedArray.from(colors as number[]));
        
        ctx.putImageData(data, x, y);
    };
    
    public resize(width: number, height: number) {
        const ctx = this.ctx,
              data = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
    
        ctx.canvas.width = width;
        ctx.canvas.height = height;
        ctx.putImageData(data, 0, 0);
    };

    public dataUrl(mime: 'image/png' | 'image/jpeg' | 'image/webp') {
        return this.ctx.canvas.toDataURL(mime);
    };
    public buffer(mime: 'image/png' | 'image/jpeg' | 'image/webp') {
        if (mime === 'image/png') {
            return this.ctx.canvas.toBuffer('image/png');
        } else return this.ctx.canvas.toBuffer(mime);
    };
};
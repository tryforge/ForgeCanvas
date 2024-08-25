import { createCanvas, loadImage, SKRSContext2D, Image } from '@napi-rs/canvas';
import { FillOrStroke, FillOrStrokeOrClear, FilterMethod, Filters, fontRegex } from '..';
import { CanvasUtil } from '..';

export class CanvasBuilder {
    public ctx: SKRSContext2D;
    public utl = CanvasUtil;
    
    public get width () { return this.ctx.canvas.width };
    public get height () { return this.ctx.canvas.height };

    constructor (width: number, height: number) {
        this.ctx = createCanvas(width,height).getContext('2d');
    };

    public rect (type: FillOrStrokeOrClear, x: number, y: number, width?: number | null, height?: number | null, radius?: number | number[] | null) {
        const ctx = this.ctx;
        width??= ctx.canvas.width;
        height??= ctx.canvas.height;
        radius??= 0;
        
        if (type === FillOrStrokeOrClear.none)
            return ctx.roundRect(x, y, width, height, radius);

        ctx.save();
        ctx.beginPath();
        ctx.roundRect(x, y, width, height, radius);
        
        ({
            [FillOrStrokeOrClear.clear]: () => ctx.clearRect(x, y, width, height),
            [FillOrStrokeOrClear.fill]: () => ctx.fill(),
            [FillOrStrokeOrClear.stroke]: () => ctx.stroke()
        })[type]();

        ctx.restore();
    };

    public text (type: FillOrStroke, text: string, x: number, y: number, font: string, maxWidth?: number | null, multiline?: boolean | null, wrap?: boolean | null, lineOffset?: number | null) {
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

    public async drawImage (image: string | Buffer | Uint8Array | Image | ArrayBufferLike | URL, x: number, y: number, width?: number | null, height?: number | null, radius?: number | number[] | null) {
        const ctx = this.ctx;
        image = await loadImage(image);
        width??= image.width;
        height??= image.height;

        if (!radius)
          return ctx.drawImage(image, x, y, width, height);

        ctx.save();
        ctx.beginPath();
        ctx.roundRect(x, y, width, height, radius);
        ctx.clip();
        ctx.drawImage(image, x, y, width, height);
        ctx.restore();
        return;
    };

    public measureText (text: string, font: string) {
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

    public filter (method: FilterMethod, filter?: Filters | null, value?: number | null) {
        const ctx = this.ctx;
    
        if (filter && typeof filter === 'string')
            filter = Filters[filter] as unknown as Filters;

        const PxOrPerc =
                filter === Filters.grayscale || filter === Filters.sepia ? '%' : 
                    (filter === Filters.blur ? 'px' : '');

        if (method === FilterMethod.add) {
            if (!filter || !value) return;
            ctx.filter = CanvasUtil.parseFilters((ctx.filter === 'none' ? '' : ctx.filter) + `${Filters[filter]}(${value + PxOrPerc})`)?.map(x => x?.raw)?.join(' ')?.trim();
        }
        else if (method === FilterMethod.set) {
            if (!filter || !value) return;
            ctx.filter = `${Filters[filter]}(${value + PxOrPerc})`;
        }
        else if (method === FilterMethod.remove) {
            if (!filter) return;
        
            let filters = CanvasUtil.parseFilters(ctx.filter);
            const index = filters.findIndex((obj: { filter: string, raw: string, value: string }) => obj?.filter === Filters[filter]);
    
            if (index !== -1)
                filters.splice(index, 1);
    
            ctx.filter = filters.length > 0 ? filters?.map(x => x?.raw)?.join(' ')?.trim() : 'none';
        }
        else if (method === FilterMethod.clear)
            ctx.filter = 'none';
        else if (method === FilterMethod.get)
            return ctx.filter;
        else if (method === FilterMethod.json)
            return CanvasUtil.parseFilters(ctx.filter);
    };

    public rotate (angle: number) {
        const ctx = this.ctx;
    
        const centerX = ctx.canvas.width / 2;
        const centerY = ctx.canvas.height / 2;
    
        ctx.translate(centerX, centerY);
        ctx.rotate((angle * Math.PI) / 180);
        ctx.translate(-centerX, -centerY);
    };
    
    public trim () {
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
    
    public getPixels (x: number, y: number, width: number, height: number) {
        const ctx = this.ctx;
        width??= ctx.canvas.width;
        height??= ctx.canvas.height;
    
        const data = ctx.getImageData(x, y, width, height).data;
        const colors = [];
    
        for (let i = 0; i < data.length; i += 4) {
            colors.push(CanvasUtil.rgbaToHex(
                data[i],
                data[i + 1],
                data[i + 2],
                data[i + 3] / 255
            ));
        };
    
        return colors;
    };
    
    public setPixels (x: number, y: number, width: number, height: number, colors: string[]) {
        const ctx = this.ctx;
        width??= ctx.canvas.width;
        height??= ctx.canvas.height;
    
        const data = ctx.createImageData(width, height);
    
        colors?.forEach((hex, i) => {
            const colors = CanvasUtil.hexToRgba(hex);
            i = i * 4;
        
            data.data[i] = colors.red;
            data.data[i + 1] = colors.green;
            data.data[i + 2] = colors.blue;
            data.data[i + 3] = colors.alpha ?? 255;
        });
        
        ctx.putImageData(data, x, y);
    };
    
    public resize (width: number, height: number) {
        const ctx = this.ctx,
              data = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
    
        ctx.canvas.width = width;
        ctx.canvas.height = height;
        ctx.putImageData(data, 0, 0);
    };

    public get buffer () { return this.ctx.canvas.toBuffer('image/png') };
};
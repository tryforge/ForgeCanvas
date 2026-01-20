import { SKRSContext2D, Image, Canvas } from '@napi-rs/canvas';
import { FillOrStroke, FillOrStrokeOrClear, FilterMethod, Filters, ProgressBarOptions, ColorDataType, PieChartOptions, BarData, TextWrap, Spans, CanvasBuilderCustomProperties } from '..';
export declare class CanvasBuilder {
    /**
     * The inner canvas context.
     */
    ctx: SKRSContext2D;
    /**
     * The inner canvas.
     */
    canvas: Canvas;
    /**
     * Reference to the ``CanvasUtil`` class.
     */
    util: {
        validateFont: (font: string) => string | RegExpExecArray;
        resolveStyle: (self: import("@tryforge/forgescript").CompiledFunction, ctx: import("@tryforge/forgescript").Context, canvas: CanvasBuilder, style: string | undefined | null) => Promise<string | CanvasGradient | import("@napi-rs/canvas").CanvasPattern | import("@tryforge/forgescript").Return<import("@tryforge/forgescript").ReturnType.Error>>;
        resolveImage: (self: import("@tryforge/forgescript").CompiledFunction, ctx: import("@tryforge/forgescript").Context, src: string) => Promise<Image | import("@tryforge/forgescript").Return<import("@tryforge/forgescript").ReturnType.Error>>;
        rgbaStringToHex: (rgba: string) => string;
        resolveFrame: (self: import("@tryforge/forgescript").CompiledFunction, ctx: import("@tryforge/forgescript").Context, frame: string, speed: number | undefined | null) => Promise<import("@gifsx/gifsx").Frame | import("@tryforge/forgescript").Return<import("@tryforge/forgescript").ReturnType.Error>>;
        parseFilters: (filters: string) => {
            filter: string;
            value: string;
            raw: string;
        }[];
        parseText: (client: import("@tryforge/forgescript").ForgeClient, text: string, parseNL?: boolean | null, parseEmoji?: boolean | null) => Promise<Spans>;
    };
    /**
     * ``CanvasBuilder`` Exclusive Properties.
     *
     * ## Rect & Image alignment
     *  - rectAlign: The horizontal alignment of the rectangle. Defaults to ``RectAlign.right``
     *  - rectBaseline: The vertical alignment of the rectangle. Defaults to ``RectBaseline.bottom``
     *
     * Both apply to ``CanvasBuilder.rect``, ``CanvasBuilder.drawImage``, ``CanvasBuilder.drawProgressBar``, and ``CanvasBuilder.drawPieChart``.
     */
    customProperties: CanvasBuilderCustomProperties;
    get width(): number;
    get height(): number;
    set width(val: number);
    set height(val: number);
    constructor(width: number, height: number);
    /**
     * Draws a rectangle on the canvas.
     * @param type - The type of drawing operation to perform for the rectangle. (fill/stroke/clear)
     * @param x - The X coordinate of the of the rectangle.
     * @param y - The Y coordinate of the of the rectangle.
     * @param width - The width of the rectangle. ``canvas.width - x`` by default.
     * @param height - The height of the rectangle. ``canvas.height - y`` by default.
     * @param radius - The radius of the rounded corners. 0 by default.
     */
    rect(type: FillOrStrokeOrClear, x: number, y: number, width?: number | null, height?: number | null, radius?: number | number[] | null): void;
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
    text(type: FillOrStroke, spans: Spans, x: number, y: number, font: string, maxWidth?: number | null, wrap?: TextWrap | null, lineOffset?: number | null, nlBegin?: CanvasTextAlign | null): void;
    /**
     * Draws an image on the canvas.
     * Works the same as ``SKRSContext2D.drawImage`` but rounds it for you.
     * @param image - The image to draw.
     * @param x - The X coordinate of the image's starting point.
     * @param y - The Y coordinate of the image's starting point.
     * @param width - The width of the image. If not provided, defaults to the image's width.
     * @param height - The height of the image. If not provided, defaults to the image's height.
     * @param radius - The radius of the image's corners. If not provided, defaults to no rounding.
     */
    drawImage(image: string | Buffer | Uint8Array | Image | ArrayBufferLike | URL, x: number, y: number, width?: number | null, height?: number | null, radius?: number | number[] | null): Promise<void>;
    /**
     * A helper function that draws a progress bar on the canvas.
     * @param x The X coordinate of the progress bar.
     * @param y The Y coordinate of the progress bar.
     * @param width The width of the progress bar.
     * @param height The height of the progress bar.
     * @param progress The progress value between 0 and 100.
     * @param config The configuration options for the progress bar.
     */
    drawProgressBar(x: number, y: number, width: number, height: number, progress: number, config?: ProgressBarOptions): number[];
    /**
     * A helper function that draws a pie chart on the canvas.
     * @param x The X coordinate of the chart.
     * @param y The Y coordinate of the chart.
     * @param width The width of the chart.
     * @param height The height of the chart.
     * @param data The data for the chart.
     * @param config The configuration options for the chart.
     */
    drawPieChart(x: number, y: number, width: number, height: number, data: BarData[], config?: PieChartOptions): void;
    /**
     * Adds/sets/removes a filter of the canvas.
     */
    filter(method: FilterMethod, filter?: Filters | null, value?: string | null): string | {
        filter: string;
        value: string;
        raw: string;
    }[] | undefined;
    /**
     * Sets the canvas rotation angle.
     * @param angle The angle in degrees.
     */
    rotate(angle: number): void;
    /**
     * Trims the canvas by resizing the canvas only for the visible area.
     */
    trim(tTop?: boolean, tLeft?: boolean, tRight?: boolean, tBottom?: boolean): void;
    private checkRow;
    private checkColumn;
    getPixels<T extends ColorDataType>(x: number, y: number, width: number, height: number, t?: T | null): T extends ColorDataType.Rgba ? number[] : string[];
    setPixels<T extends ColorDataType>(x: number, y: number, width: number, height: number, colors: T extends ColorDataType.Rgba ? number[] : string[], t?: T | null): void;
    resize(width: number, height: number): void;
    align(x: number, y: number, width: number, height: number): [number, number];
    dataUrl(mime?: 'image/png' | 'image/jpeg' | 'image/webp' | 'image/gif'): string;
    buffer(mime?: 'image/png' | 'image/jpeg' | 'image/webp' | 'image/gif'): Buffer;
}
export declare const charWidthCache: Map<string, Map<string, number>>;
export declare const wordWidthCache: Map<string, Map<string, number>>;

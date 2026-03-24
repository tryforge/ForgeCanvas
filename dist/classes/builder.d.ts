import { Canvas, Image, SKRSContext2D } from '@napi-rs/canvas';
import { FillOrStroke, FillOrStrokeOrClear, FilterMethod, Filters, ProgressBarOptions, ColorDataType, PieChartOptions, BarData, TextWrap, Spans, CanvasBuilderCustomProperties, ImageFormat, ImageManager } from '..';
export declare class CanvasBuilder {
    /**
     * The inner canvas.
     */
    inner: Canvas;
    /**
     * The inner canvas context.
     */
    ctx: SKRSContext2D;
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
    constructor(width: number, height: number);
    get width(): number;
    get height(): number;
    set width(val: number);
    set height(val: number);
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
    drawImage(manager: ImageManager | null, image: string | Buffer | Uint8Array | Image | ArrayBufferLike | URL, x: number, y: number, width?: number | null, height?: number | null, radius?: number | number[] | null, srcX?: number | null, srcY?: number | null, srcWidth?: number | null, srcHeight?: number | null): Promise<void>;
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
     * @param method - The method AKA filter action to perform.
     * @param filter - The filter to add, set, or remove.
     * @param value - The value of the filter.
     */
    filter(method: FilterMethod, filter?: Filters | null, value?: string | null): string | any[] | undefined;
    /**
     * Sets the canvas rotation angle.
     * @param angle The angle in degrees.
     */
    rotate(angle: number): void;
    /**
     * Trims the canvas by resizing the canvas only for the visible area.
     */
    trim(tTop?: boolean, tLeft?: boolean, tRight?: boolean, tBottom?: boolean): void;
    private static checkRow;
    private static checkColumn;
    /** Returns an array of pixels at a rectangle */
    getPixels<T extends ColorDataType>(x: number, y: number, width: number, height: number, t?: T | null): T extends ColorDataType.Rgba ? number[] : string[];
    /** Returns an array of pixels at a rectangle */
    setPixels<T extends ColorDataType>(x: number, y: number, width: number, height: number, colors: T extends ColorDataType.Rgba ? number[] : string[], t?: T | null): void;
    /** Resizes the canvas */
    resize(width: number, height: number): void;
    /** Calculates the alignment coordinates */
    align(x: number, y: number, width: number, height: number): [number, number];
    dataUrl(format?: ImageFormat | null): Promise<string>;
    buffer(format?: ImageFormat | null): Buffer<ArrayBufferLike>;
    encode(format?: ImageFormat | null): Promise<Buffer<ArrayBufferLike>>;
}
export declare const charWidthCache: Map<string, Map<string, number>>;
export declare const wordWidthCache: Map<string, Map<string, number>>;

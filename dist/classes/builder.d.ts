import { SKRSContext2D, Image } from '@napi-rs/canvas';
import { CustomCanvasProperties, FillOrStroke, FillOrStrokeOrClear, FilterMethod, Filters, CanvasUtil, ProgressBarOptions, ColorDataType, PieChartOptions, BarData } from '..';
export declare class CanvasBuilder {
    ctx: SKRSContext2D;
    util: typeof CanvasUtil;
    customProperties: CustomCanvasProperties;
    get width(): number;
    get height(): number;
    set width(val: number);
    set height(val: number);
    constructor(width: number, height: number);
    rect(type: FillOrStrokeOrClear, x: number, y: number, width?: number | null, height?: number | null, radius?: number | number[] | null): void;
    text(type: FillOrStroke, text: string, x: number, y: number, font: string, maxWidth?: number | null, multiline?: boolean | null, wrap?: boolean | null, lineOffset?: number | null): void;
    drawImage(image: string | Buffer | Uint8Array | Image | ArrayBufferLike | URL, x: number, y: number, width?: number | null, height?: number | null, radius?: number | number[] | null): Promise<void>;
    drawProgressBar(x: number, y: number, width: number, height: number, progress: number, config?: ProgressBarOptions): number[];
    drawPieChart(x: number, y: number, width: number, height: number, data: BarData[], config?: PieChartOptions): void;
    measureText(text: string, font: string): TextMetrics;
    filter(method: FilterMethod, filter?: Filters | null, value?: string | null): string | {
        filter: string;
        value: string;
        raw: string;
    }[] | undefined;
    rotate(angle: number): void;
    trim(): void;
    getPixels<T extends ColorDataType>(x: number, y: number, width: number, height: number, t?: T | null): T extends ColorDataType.Rgba ? number[] : string[];
    setPixels<T extends ColorDataType>(x: number, y: number, width: number, height: number, colors: T extends ColorDataType.Rgba ? number[] : string[], t?: T | null): void;
    resize(width: number, height: number): void;
    get dataUrl(): string;
    get buffer(): Buffer;
}
//# sourceMappingURL=builder.d.ts.map
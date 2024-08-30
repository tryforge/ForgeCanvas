import { SKRSContext2D, Image } from '@napi-rs/canvas';
import { FillOrStroke, FillOrStrokeOrClear, FilterMethod, Filters } from '..';
import { CanvasUtil } from '..';
export declare class CanvasBuilder {
    ctx: SKRSContext2D;
    utl: typeof CanvasUtil;
    get width(): number;
    get height(): number;
    constructor(width: number, height: number);
    rect(type: FillOrStrokeOrClear, x: number, y: number, width?: number | null, height?: number | null, radius?: number | number[] | null): void;
    text(type: FillOrStroke, text: string, x: number, y: number, font: string, maxWidth?: number | null, multiline?: boolean | null, wrap?: boolean | null, lineOffset?: number | null): void;
    drawImage(image: string | Buffer | Uint8Array | Image | ArrayBufferLike | URL, x: number, y: number, width?: number | null, height?: number | null, radius?: number | number[] | null): Promise<void>;
    measureText(text: string, font: string): TextMetrics;
    filter(method: FilterMethod, filter?: Filters | null, value?: number | null): string | {
        filter: string;
        value: string;
        raw: string;
    }[] | undefined;
    rotate(angle: number): void;
    trim(): void;
    getPixels(x: number, y: number, width: number, height: number): string[];
    setPixels(x: number, y: number, width: number, height: number, colors: string[]): void;
    resize(width: number, height: number): void;
    get buffer(): Buffer;
}
//# sourceMappingURL=builder.d.ts.map
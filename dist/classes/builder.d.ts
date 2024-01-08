/// <reference types="node" />
import { SKRSContext2D } from "@napi-rs/canvas";
export declare enum TextAlign {
    start = 0,
    left = 1,
    center = 2,
    right = 3,
    end = 4
}
export declare enum RevesedTextAlign {
    end = 0,
    right = 1,
    center = 2,
    left = 3,
    start = 4
}
export declare class CanvasBuilder {
    static ctx: SKRSContext2D;
    constructor(width: number, height: number);
    drawImage: (image: any, x: number, y: number, width?: number, height?: number, radius?: number) => Promise<SKRSContext2D>;
    fillText: (text: string, x: number, y: number, font: string, color: number, maxWidth?: number) => SKRSContext2D;
    strokeText: (text: string, x: number, y: number, font: string, color: number, width?: number) => SKRSContext2D;
    fillRect: (color: number, x: number, y: number, width: number, height: number, radius?: number) => SKRSContext2D;
    strokeRect: (color: number, x: number, y: number, width: number, height: number, strokeWidth?: number, radius?: number) => SKRSContext2D;
    setTextAlignment: (alignment: TextAlign) => SKRSContext2D;
    render: () => Buffer;
}
//# sourceMappingURL=builder.d.ts.map
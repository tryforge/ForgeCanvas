/// <reference types="node" />
import { SKRSContext2D } from "@napi-rs/canvas";
export declare class CanvasBuilder {
    static ctx: SKRSContext2D;
    constructor(width: number, height: number);
    drawImage: (image: any, x: number, y: number, width?: number, height?: number, radius?: number) => Promise<SKRSContext2D>;
    fillText: (text: string, x: number, y: number, font: string, color: number) => SKRSContext2D;
    strokeText: (text: string, x: number, y: number, font: string, color: number, width?: number) => SKRSContext2D;
    fillRect: (color: number, x: number, y: number, width: number, height: number, radius?: number) => SKRSContext2D;
    strokeRect: (color: number, x: number, y: number, width: number, height: number, strokeWidth?: number, radius?: number) => SKRSContext2D;
    render: () => Buffer;
}
//# sourceMappingURL=builder.d.ts.map
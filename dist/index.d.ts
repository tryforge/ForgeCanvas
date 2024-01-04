/// <reference types="node" />
import { Canvas, SKRSContext2D } from "@napi-rs/canvas";
import { ForgeClient, ForgeExtension } from "forgescript";
export declare class ForgeCanvas extends ForgeExtension {
    static canvas: Canvas;
    static ctx: SKRSContext2D;
    name: string;
    description: string;
    version: string;
    constructor();
    init(client: ForgeClient): void;
    static create(width: number, height: number): SKRSContext2D;
    static drawImage(image: any, dx: number, dy: number, dw?: number | null, dh?: number | null): Promise<void>;
    static render(): Buffer;
}
//# sourceMappingURL=index.d.ts.map
import { Image } from '@napi-rs/canvas';
import { CanvasBuilder } from './builder';
import { GradientType } from '../';
import { DecodeOptions, Decoder, Encoder } from '@gifsx/gifsx';
declare class Manager<T> {
    map: Map<string, T>;
    constructor();
    get(name: string): T | undefined;
    remove(name: string): void;
}
export declare class CanvasManager extends Manager<CanvasBuilder> {
    current: CanvasBuilder[];
    constructor();
    set(name: string, canvas: CanvasBuilder): void;
    set(name: string, width: number, height: number): void;
}
export declare class GradientManager extends Manager<CanvasGradient> {
    private ctx;
    stops: [number, string][];
    constructor();
    set(name: string, gradient: CanvasGradient): void;
    set(name: string, type: GradientType.radial, x1: number, y1: number, r1: number, x2: number, y2: number, r2: number): void;
    set(name: string, type: GradientType.conic, startAngle: number, x: number, y: number): void;
    set(name: string, type: GradientType.linear, x1: number, y1: number, x2: number, y2: number): void;
}
export declare class ImageManager extends Manager<Image> {
    set(name: string, image: Image): void;
}
export declare class GIFManager {
    encoders: Map<string, Encoder>;
    decoders: Map<string, Decoder>;
    decodeOptions: Map<string, DecodeOptions>;
    currentOptions: DecodeOptions | null;
    currentEncoder: Encoder[];
    constructor();
    setEncoder(name: string, encoder: Encoder): void;
    setDecoder(name: string, decoder: Decoder): void;
    setDecodeOptions(name: string, options: DecodeOptions): void;
    getEncoder(name: string): Encoder | undefined;
    getDecoder(name: string): Decoder | undefined;
    getDecodeOptions(name: string): DecodeOptions | undefined;
    removeEncoder(name: string): void;
    removeDecoder(name: string): void;
    removeDecodeOptions(name: string): void;
}
export {};
//# sourceMappingURL=manager.d.ts.map
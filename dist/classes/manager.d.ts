import { CanvasGradient, Image, LottieAnimation, LoadImageOptions } from '@napi-rs/canvas';
import { DecodeOptions, Decoder, Encoder, Frame, NeuQuant } from '@gifsx/gifsx';
import { ForgeFunction, IForgeFunction } from '@tryforge/forgescript';
import { CanvasBuilder, GradientType } from '..';
declare class Manager<T> {
    map: Map<string, T>;
    constructor();
    get(name: string): T | undefined;
    remove(name: string): void;
}
export declare class CanvasManager extends Manager<CanvasBuilder> {
    current: CanvasBuilder | undefined;
    set(name: string, canvas: CanvasBuilder): void;
    set(name: string, width: number, height: number): void;
    getOrCurrent(name: string | null): CanvasBuilder | undefined;
}
export declare class GIFManager {
    encoders: Map<string, Encoder>;
    decoders: Map<string, Decoder>;
    decodeOptions: Map<string, DecodeOptions>;
    frames: Map<string, Frame>;
    currentOptions: DecodeOptions | undefined;
    currentEncoder: Encoder | undefined;
    constructor();
    getEncoderOrCurrent(name: string | null): Encoder | undefined;
    setEncoder(name: string, encoder: Encoder): void;
    setDecoder(name: string, decoder: Decoder): void;
    setDecodeOptions(name: string, options: DecodeOptions): void;
    setFrame(name: string, frame: Frame): void;
    getEncoder(name: string): Encoder | undefined;
    getDecoder(name: string): Decoder | undefined;
    getDecodeOptions(name: string): DecodeOptions | undefined;
    getFrame(name: string): Frame | undefined;
    removeEncoder(name: string): void;
    removeDecoder(name: string): void;
    removeDecodeOptions(name: string): void;
    removeFrame(name: string): void;
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
    loadOptions?: LoadImageOptions;
    set(name: string, image: Image): void;
    load(src: string | Buffer | Uint8Array | Image | ArrayBufferLike | URL): Promise<Image>;
    load(name: string, src: string | Buffer | Uint8Array | Image | ArrayBufferLike | URL): Promise<Image>;
    tryGet(name: string, src: string | Buffer | Uint8Array | Image | ArrayBufferLike | URL): Promise<Image>;
}
export declare class NeuQuantManager extends Manager<NeuQuant> {
    set(name: string, nq: NeuQuant): void;
}
export declare class LottieManager extends Manager<LottieAnimation> {
    set(name: string, lottie: LottieAnimation): void;
}
export declare class ComponentManager extends Manager<ForgeFunction> {
    set(component: ForgeFunction | IForgeFunction): void;
    load(path: string, log?: boolean): void;
}
export {};

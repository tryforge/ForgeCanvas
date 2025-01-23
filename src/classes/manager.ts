import { createCanvas, Image, SKRSContext2D } from '@napi-rs/canvas';
import { CanvasBuilder } from './builder';
import { GradientType } from '../';
import { DecodeOptions, Decoder, Encoder, Frame, NeuQuant } from '@gifsx/gifsx';

class Manager<T> {
    public map: Map<string, T>;

    constructor() {
        this.map = new Map();
    };

    public get(name: string) { return this.map.get(name) };
    public remove(name: string) { this.map.delete(name) };
};

export class CanvasManager extends Manager<CanvasBuilder> {
    public current: CanvasBuilder[];

    constructor() {
        super();
        this.current = [];
    };

    set(name: string, canvas: CanvasBuilder): void;
    set(name: string, width: number, height: number): void;
    public set(name: string, a: CanvasBuilder | number, b?: number) {
        if (typeof a === 'number')
            this.map.set(name, new CanvasBuilder(a, b ?? a));
        else this.map.set(name, a);
    };
};

export class GradientManager extends Manager<CanvasGradient> {
    private ctx: SKRSContext2D;
    public stops: [number, string][];

    constructor() {
        super();
        this.ctx = createCanvas(1, 1).getContext('2d');
        this.stops = [];
    };

    set(name: string, gradient: CanvasGradient): void;
    set(name: string, type: GradientType.radial, x1: number, y1: number, r1: number, x2: number, y2: number, r2: number): void;
    set(name: string, type: GradientType.conic, startAngle: number, x: number, y: number): void;
    set(name: string, type: GradientType.linear, x1: number, y1: number, x2: number, y2: number): void;
    public set(name: string, a: CanvasGradient | GradientType, ...options: number[]) {
        if (GradientType?.[a as any])
            this.map.set(name, a === GradientType.radial
                ? this.ctx.createRadialGradient(...options as [number, number, number, number, number, number])
                : a === GradientType.conic
                    ? this.ctx.createConicGradient(...options as [number, number, number])
                    : this.ctx.createLinearGradient(...options as [number, number, number, number]));
        else this.map.set(name, a as CanvasGradient);
    };
};

export class ImageManager extends Manager<Image> {
    public set(name: string, image: Image) { this.map.set(name, image) };
};

export class GIFManager {
    public encoders: Map<string, Encoder>;
    public decoders: Map<string, Decoder>;
    public decodeOptions: Map<string, DecodeOptions>;
    public frames: Map<string, Frame>;
    public currentOptions: DecodeOptions | null;
    public currentEncoder: Encoder[];

    constructor() {
        this.encoders = new Map();
        this.decoders = new Map();
        this.decodeOptions = new Map();
        this.frames = new Map();
        this.currentOptions = null;
        this.currentEncoder = [];
    };

    public setEncoder(name: string, encoder: Encoder) { this.encoders.set(name, encoder) };
    public setDecoder(name: string, decoder: Decoder) { this.decoders.set(name, decoder) };
    public setDecodeOptions(name: string, options: DecodeOptions) { this.decodeOptions.set(name, options) };
    public setFrame(name: string, frame: Frame) { this.frames.set(name, frame) };

    public getEncoder(name: string) { return this.encoders.get(name) };
    public getDecoder(name: string) { return this.decoders.get(name) };
    public getDecodeOptions(name: string) { return this.decodeOptions.get(name) };
    public getFrame(name: string) { return this.frames.get(name) };

    public removeEncoder(name: string) { this.encoders.delete(name) };
    public removeDecoder(name: string) { this.decoders.delete(name) };
    public removeDecodeOptions(name: string) { this.decodeOptions.delete(name) };
    public removeFrame(name: string) { this.frames.delete(name) };
};

export class NeuQuantManager extends Manager<NeuQuant> {
    public set(name: string, nq: NeuQuant) { this.map.set(name, nq) };
}
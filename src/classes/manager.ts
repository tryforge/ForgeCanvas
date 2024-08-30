import { createCanvas, SKRSContext2D } from '@napi-rs/canvas';
import { CanvasBuilder } from './builder';
import { GradientType } from '../typings';

class Manager<T> {
    public map: Map<string, T>;

    constructor () {
        this.map = new Map();
    };

    public get (name: string) { return this.map.get(name) };
    public remove (name: string) { this.map.delete(name) };
};

export class CanvasManager extends Manager<CanvasBuilder> {
    public current: CanvasBuilder[];

    constructor () {
        super();
        this.current = [];
    };

    set (name: string, canvas: CanvasBuilder): void;
    set (name: string, width: number, height: number): void;
    public set (name: string, a: CanvasBuilder | number, b?: number) {
        if (typeof a !== 'number')
            this.map.set(name, a);
        else
            this.map.set(name, new CanvasBuilder(a, b ?? a));
    };
};

export class GradientManager extends Manager<CanvasGradient> {
    private ctx: SKRSContext2D;
    public stops: [number, string][];

    constructor () {
        super();
        this.ctx = createCanvas(1, 1).getContext('2d');
        this.stops = [];
    };

    set (name: string, gradient: CanvasGradient): void;
    set (name: string, type: GradientType.radial, x1: number, y1: number, r1: number, x2: number, y2: number, r2: number): void;
    set (name: string, type: GradientType.conic, startAngle: number, x: number, y: number): void;
    set (name: string, type: GradientType.linear, x1: number, y1: number, x2: number, y2: number): void;
    public set (name: string, a: CanvasGradient | GradientType, ...options: number[]) {
        if (GradientType?.[a as any])
            this.map.set(name, a === GradientType.radial
                ? this.ctx.createRadialGradient(...options as [number, number, number, number, number, number])
                : a === GradientType.conic
                    ? this.ctx.createConicGradient(...options as [number, number, number])
                    : this.ctx.createLinearGradient(...options as [number, number, number, number]));
        else this.map.set(name, a as CanvasGradient);
    };
};
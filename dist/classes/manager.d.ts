import { CanvasBuilder } from './builder';
import { GradientType } from '../typings';
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
export {};
//# sourceMappingURL=manager.d.ts.map
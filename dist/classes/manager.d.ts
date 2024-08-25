import { CanvasBuilder } from './builder';
export declare class CanvasManager {
    map: Map<string, CanvasBuilder>;
    current: CanvasBuilder[];
    constructor();
    set(name: string, canvas: CanvasBuilder): void;
    set(name: string, width: number, height: number): void;
    get(name: string): CanvasBuilder | undefined;
    remove(name: string): void;
}
//# sourceMappingURL=manager.d.ts.map
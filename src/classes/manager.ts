import { CanvasBuilder } from './builder';

export class CanvasManager {
    public map: Map<string, CanvasBuilder>;
    public current: CanvasBuilder[];

    constructor () {
        this.map = new Map();
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

    public get (name: string) { return this.map.get(name) };
    public remove (name: string) { this.map.delete(name) };
};
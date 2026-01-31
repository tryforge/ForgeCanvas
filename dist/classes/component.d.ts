import { IExtendedCompilationResult } from '@tryforge/forgescript';
export interface ICanvasComponent {
    /**
     * The name of the component.
     */
    name: string;
    /**
     * The code of the component.
     */
    code: string;
}
export declare class CanvasComponent implements ICanvasComponent {
    #private;
    name: string;
    get code(): string;
    /**
     * The compiled code.
     */
    compiled: IExtendedCompilationResult;
    constructor(component: ICanvasComponent);
}

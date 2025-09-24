import { ForgeExtension } from '@tryforge/forgescript';
import { CanvasManager, GradientManager, ImageManager, GIFManager, NeuQuantManager } from './classes';
export declare function registerFonts(fonts: {
    src: string;
    name?: string | null;
}[], log: boolean): Promise<void>;
export declare class ForgeCanvas extends ForgeExtension {
    name: string;
    description: string;
    version: string;
    init(): void;
}
declare module '@tryforge/forgescript' {
    interface Context {
        canvasManager?: CanvasManager;
        gradientManager?: GradientManager;
        imageManager?: ImageManager;
        gifManager?: GIFManager;
        neuquantManager?: NeuQuantManager;
    }
}
declare module '@napi-rs/canvas' {
    interface Image {
        getBuffer(): Promise<Buffer | undefined>;
    }
}
export * from './classes';
export * from './typings';

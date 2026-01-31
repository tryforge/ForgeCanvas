import { ForgeClient, ForgeExtension } from '@tryforge/forgescript';
import { CanvasManager, GradientManager, ImageManager, GIFManager, NeuQuantManager, LottieManager, ComponentManager } from './classes';
export declare const SUPPORTED_FONT_FORMATS: string[];
export declare function registerFonts(fonts: {
    src: string;
    name?: string | null;
}[], log?: boolean): Promise<void>;
export declare class ForgeCanvas extends ForgeExtension {
    name: string;
    description: string;
    version: string;
    init(client: ForgeClient): void;
    static components: ComponentManager;
}
declare module '@tryforge/forgescript' {
    interface ForgeClient {
        preloadImages: ImageManager;
    }
    interface Context {
        canvasManager?: CanvasManager;
        gradientManager?: GradientManager;
        imageManager?: ImageManager;
        gifManager?: GIFManager;
        neuquantManager?: NeuQuantManager;
        lottieManager?: LottieManager;
    }
}
declare module '@napi-rs/canvas' {
    interface Image {
        getBuffer(): Promise<Buffer | undefined>;
    }
}
export * from './classes';
export * from './typings';

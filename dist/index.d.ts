import { ForgeClient, ForgeExtension } from '@tryforge/forgescript';
import { CanvasManager, ComponentManager, GIFManager, GradientManager, ImageManager, LottieManager, NeuQuantManager } from './classes';
export declare const version: string;
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
export * from './structures';
export * from './classes';

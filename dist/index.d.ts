import { ForgeExtension } from '@tryforge/forgescript';
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
export * from './classes';
export * from './typings';

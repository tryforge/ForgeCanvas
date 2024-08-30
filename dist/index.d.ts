import { ForgeExtension } from '@tryforge/forgescript';
export declare const registerFonts: (fonts: {
    src: string;
    name?: string | null;
}[]) => Promise<void>;
export declare class ForgeCanvas extends ForgeExtension {
    name: string;
    description: string;
    version: string;
    init(): void;
}
export * from './classes';
export * from './typings';
//# sourceMappingURL=index.d.ts.map
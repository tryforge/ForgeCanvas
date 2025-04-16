import { Image } from '@napi-rs/canvas';
import { Context } from '@tryforge/forgescript';
import { Frame } from '@gifsx/gifsx';
import { RectAlign, RectBaseline } from '..';
import { CanvasBuilder } from './builder';
export declare const fontRegex: RegExp;
export declare const rgbaRegex: RegExp;
export declare const hexRegex: RegExp;
export declare const Colors: Record<string, string>;
export declare const CanvasUtil: {
    isValidFont: (font: string) => boolean;
    parseStyle: (self: any, ctx: Context, canvas: CanvasBuilder, style: string | undefined | null) => Promise<any>;
    calculateRectAlignOrBaseline: (XorY: number, WorH: number, AorB: RectAlign | RectBaseline) => number;
    parseFilters: (filters: string) => {
        filter: string;
        value: string;
        raw: string;
    }[];
};
export declare function loadFrame(src: string | URL | Buffer | ArrayBufferLike | Uint8Array | Image | import("stream").Readable, speed?: number | null): Promise<Frame>;
export declare function parseArgs(str: string, prefix: string | number, length: number, rest?: boolean): string[];

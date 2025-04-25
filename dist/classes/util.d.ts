import { Image } from '@napi-rs/canvas';
import { CompiledFunction, Context } from '@tryforge/forgescript';
import { Frame } from '@gifsx/gifsx';
import { RectAlign, RectBaseline } from '..';
import { CanvasBuilder } from './builder';
export declare const fontRegex: RegExp;
export declare const rgbaRegex: RegExp;
export declare const hexRegex: RegExp;
export declare const Colors: Record<string, string>;
export declare const CanvasUtil: {
    isValidFont: (font: string) => boolean;
    resolveStyle: (self: CompiledFunction, ctx: Context, canvas: CanvasBuilder, style: string | undefined | null) => Promise<string | CanvasGradient | CanvasPattern | import("@tryforge/forgescript").Return<import("@tryforge/forgescript").ReturnType.Error>>;
    resolveImage: (self: CompiledFunction, ctx: Context, src: string) => Promise<Image | import("@tryforge/forgescript").Return<import("@tryforge/forgescript").ReturnType.Error>>;
    rgbaStringToHex: (rgba: string) => string;
    resolveFrame: (self: CompiledFunction, ctx: Context, frame: string, speed: number | undefined | null) => Promise<Frame | import("@tryforge/forgescript").Return<import("@tryforge/forgescript").ReturnType.Error>>;
    calculateRectAlignOrBaseline: (XorY: number, WorH: number, AorB: RectAlign | RectBaseline) => number;
    parseFilters: (filters: string) => {
        filter: string;
        value: string;
        raw: string;
    }[];
};
export declare function loadFrame(src: string | URL | Buffer | ArrayBufferLike | Uint8Array | Image | import("stream").Readable, speed?: number | null): Promise<Frame>;
export declare function parseArgs(str: string, prefix: string | number, length: number, rest?: boolean): string[];
export declare enum FCError {
    NoCanvas = "No canvas with provided name found",
    NoImage = "No image with provided name found",
    NoGradient = "No gradient with provided name found",
    NoStyle = "No style provided",
    ImageFail = "Failed to load an image",
    InvalidOffset = "Offset must be between 0 and 100",
    InvalidRectType = "Invalid rect type provided (Expected fill/stroke/clear)",
    InvalidLineDashSegments = "Invalid line dash segments provided (Expected array of numbers)",
    NoEncoder = "No GIF encoder with provided name found",
    NoDecoder = "No GIF decoder with provided name found",
    NoDecodeOptions = "No decode options with provided name found",
    NoNeuQuant = "No NeuQuant Instance with provided name found",
    NoFrame = "No frame with provided name found",
    NoSizeAndPalette = "No size and palette has been set",
    FrameFail = "Failed to load a frame",
    NoBarData = "No bar data provided",
    InvalidBarData = "Invalid bar data provided",
    InvalidBarType = "Invalid bar type provided (Expected normal/pie)",
    InvalidBarDirection = "Invalid bar direction provided (Expected horizontal/vertical)",
    NoSize = "No size has been set",
    NoPath = "No path provided",
    ArrayExpected = "Array expected"
}

import { Context as ctx } from '@tryforge/forgescript';
import { CanvasManager, GIFManager, GradientManager, ImageManager } from './classes';

export class Context extends ctx {
    canvasManager?: CanvasManager;
    gradientManager?: GradientManager;
    imageManager?: ImageManager;
    gifManager?: GIFManager;
};

export interface CustomCanvasProperties {
    rectAlign?: RectAlign;
    rectBaseline?: RectBaseline;
};

export interface ProgressBarOptions {
    style?: string | CanvasGradient | CanvasPattern;
    background?: {
        enabled: boolean;
        style?: string | CanvasGradient | CanvasPattern;
        radius?: number | number[];
        type?: 'fill' | 'stroke' | 'clear';
        padding?: number;
    };
    type?: 'fill' | 'stroke' | 'clear';
    radius?: number | number[];
    direction?: 'horizontal' | 'vertical';
    clip?: number | number[];
    left?: string | CanvasGradient | CanvasPattern;
};

export interface PieChartOptions {
    type?: 'fill' | 'stroke';
    background?: {
        enabled: boolean;
        style?: string | CanvasGradient | CanvasPattern;
        radius?: number | number[];
        type?: 'fill' | 'stroke' | 'clear';
        padding?: number;
    }
    radius?: number;
    left?: string | CanvasGradient | CanvasPattern;
};

export interface BarData {
    value: number;
    style: string | CanvasGradient | CanvasPattern;
};
export interface BarOptions {
    'type'?: 'normal' | 'pie';
    'draw-type'?: 'fill' | 'stroke' | 'clear';
    'height'?: number;
    'max-width'?: number;
    'background-style'?: string;
    'background-radius'?: number | number[];
    'background-padding'?: number;
    'background-type'?: 'fill' | 'stroke' | 'clear';
    'radius'?: number | number[];
    'direction'?: 'horizontal' | 'vertical';
    'clip-radius'?: number | number[];
    'left'?: string;
};

export enum RectAlign { left, center, right };
export enum RectBaseline { top, center, bottom };
export enum FillOrStroke { fill, stroke };
export enum FillOrStrokeOrClear { none, fill, stroke, clear };
export enum WidthOrHeight { width, height };
export enum AlignOrBaseline { align, baseline };
export enum StyleType { color, gradient, pattern };
export enum FilterMethod { add, set, remove, clear, get, json };
export enum Filters { none, blur, sepia, grayscale, brightness, contrast, invert, saturate, 'drop-shadow' };
export enum TextBaseline { top, hanging, middle, alphabetic, ideographic, bottom };
export enum TextAlign { start, right, center, left, end };
export enum GradientType { linear, radial, conic };
export enum FillRule { evenodd, nonzero };
export enum LineJoinShape { round, bevel, miter };
export enum MeasureTextProperty {
    actualBoundingBoxAscent,
    actualBoundingBoxDescent,
    actualBoundingBoxLeft, 
    actualBoundingBoxRight,
    fontBoundingBoxAscent, 
    fontBoundingBoxDescent,
    alphabeticBaseline,
    emHeightAscent,
    emHeightDescent,
    width
};
export enum CompositingOperation {
    'source-over',
    'source-in',
    'source-out',
    'source-atop',
    'destination-over',
    'destination-in',
    'destination-out',
    'destination-atop',
    'lighter',
    'copy',
    'xor',
    'multiply',
    'screen',
    'overlay',
    'darken',
    'lighten',
    'color-dodge',
    'color-burn',
    'hard-light',
    'soft-light',
    'difference',
    'exclusion',
    'hue',
    'saturation',
    'color',
    'luminosity'
};
export enum FontVariantCaps {
    'normal',
    'small-caps',
    'all-small-caps',
    'petite-caps',
    'all-petite-caps',
    'unicase',
    'titling-caps'
};
export enum ColorDataType {
    Rgba,
    Hex
};
export enum ColorOutput {
    Rgba,
    IndexedPixels 
};
export enum DisposalMethod {
    Any,
    Keep,
    Background,
    Previous
};
export enum FrameOption {
    delay,
    dispose,
    transparent,
    needsUserInput,
    top,
    left,
    width,
    height,
    interlaced,
    palette,
    buffer
};
export enum DecoderOption {
    bgColor,
    bufferSize,
    globalPalette,
    lineLength,
    loops
};
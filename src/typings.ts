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
    angle?: number;
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
    clip?: {
        enabled: boolean;
        radius?: number | number[];
    };
    left?: string | CanvasGradient | CanvasPattern;
};

type rawr<num extends number, meow extends number[] = []> = 
  meow['length'] extends num
    ? meow[number]
    : rawr<num, [...meow, meow['length']]>;

export type Range<Min extends number, Max extends number> = 
  Min extends Max 
    ? never 
    : Exclude<rawr<Max>, rawr<Min>> | Min | Max;

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
export enum ColorQuantizationAlgorithm {
    neuquant,
    octree  
};
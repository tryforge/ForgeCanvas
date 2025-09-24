export interface CustomCanvasProperties {
    rectAlign?: RectAlign;
    rectBaseline?: RectBaseline;
}
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
}
export interface PieChartOptions {
    type?: 'fill' | 'stroke';
    background?: {
        enabled: boolean;
        style?: string | CanvasGradient | CanvasPattern;
        radius?: number | number[];
        type?: 'fill' | 'stroke' | 'clear';
        padding?: number;
    };
    radius?: number;
    left?: string | CanvasGradient | CanvasPattern;
}
export interface BarData {
    value: number;
    style: string | CanvasGradient | CanvasPattern;
}
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
}
export declare enum ImageFormat {
    png = 0,
    jpeg = 1,
    avif = 2,
    webp = 3
}
export declare enum RectAlign {
    left = 0,
    center = 1,
    right = 2
}
export declare enum RectBaseline {
    top = 0,
    center = 1,
    bottom = 2
}
export declare enum FillOrStroke {
    fill = 0,
    stroke = 1
}
export declare enum FillOrStrokeOrClear {
    none = 0,
    fill = 1,
    stroke = 2,
    clear = 3
}
export declare enum WidthOrHeight {
    width = 0,
    height = 1
}
export declare enum AlignOrBaseline {
    align = 0,
    baseline = 1
}
export declare enum StyleType {
    color = 0,
    gradient = 1,
    pattern = 2
}
export declare enum FilterMethod {
    add = 0,
    set = 1,
    remove = 2,
    clear = 3,
    get = 4,
    json = 5
}
export declare enum Filters {
    none = 0,
    blur = 1,
    sepia = 2,
    grayscale = 3,
    brightness = 4,
    contrast = 5,
    invert = 6,
    saturate = 7,
    'drop-shadow' = 8
}
export declare enum TextBaseline {
    top = 0,
    hanging = 1,
    middle = 2,
    alphabetic = 3,
    ideographic = 4,
    bottom = 5
}
export declare enum TextAlign {
    start = 0,
    right = 1,
    center = 2,
    left = 3,
    end = 4
}
export declare enum GradientType {
    linear = 0,
    radial = 1,
    conic = 2
}
export declare enum FillRule {
    evenodd = 0,
    nonzero = 1
}
export declare enum LineJoinShape {
    round = 0,
    bevel = 1,
    miter = 2
}
export declare enum MeasureTextProperty {
    actualBoundingBoxAscent = 0,
    actualBoundingBoxDescent = 1,
    actualBoundingBoxLeft = 2,
    actualBoundingBoxRight = 3,
    fontBoundingBoxAscent = 4,
    fontBoundingBoxDescent = 5,
    alphabeticBaseline = 6,
    emHeightAscent = 7,
    emHeightDescent = 8,
    width = 9
}
export declare enum CompositingOperation {
    'source-over' = 0,
    'source-in' = 1,
    'source-out' = 2,
    'source-atop' = 3,
    'destination-over' = 4,
    'destination-in' = 5,
    'destination-out' = 6,
    'destination-atop' = 7,
    'lighter' = 8,
    'copy' = 9,
    'xor' = 10,
    'multiply' = 11,
    'screen' = 12,
    'overlay' = 13,
    'darken' = 14,
    'lighten' = 15,
    'color-dodge' = 16,
    'color-burn' = 17,
    'hard-light' = 18,
    'soft-light' = 19,
    'difference' = 20,
    'exclusion' = 21,
    'hue' = 22,
    'saturation' = 23,
    'color' = 24,
    'luminosity' = 25
}
export declare enum FontVariantCaps {
    'normal' = 0,
    'small-caps' = 1,
    'all-small-caps' = 2,
    'petite-caps' = 3,
    'all-petite-caps' = 4,
    'unicase' = 5,
    'titling-caps' = 6
}
export declare enum ColorDataType {
    Rgba = 0,
    Hex = 1
}
export declare enum ColorOutput {
    Rgba = 0,
    IndexedPixels = 1,
    Hex = 2
}
export declare enum DisposalMethod {
    Any = 0,
    Keep = 1,
    Background = 2,
    Previous = 3
}
export declare enum FrameOption {
    delay = 0,
    dispose = 1,
    transparent = 2,
    needsUserInput = 3,
    top = 4,
    left = 5,
    width = 6,
    height = 7,
    interlaced = 8,
    palette = 9,
    buffer = 10
}
export declare enum DecoderOption {
    bgColor = 0,
    bufferSize = 1,
    globalPalette = 2,
    lineLength = 3,
    loops = 4
}

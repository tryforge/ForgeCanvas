import { Context as ctx } from "@tryforge/forgescript";
import { CanvasManager, GradientManager } from "./classes";

export class Context extends ctx {
    canvasManager?: CanvasManager;
    gradientManager?: GradientManager;
};

// Enums
export enum FillOrStroke { fill, stroke };
export enum FillOrStrokeOrClear { none, fill, stroke, clear };
export enum WidthOrHeight { width, height };
export enum StyleType { color, gradient, pattern };
export enum FilterMethod { add, set, remove, clear, get, json };
export enum Filters { none, blur, sepia, grayscale, brightness, contrast, invert, saturate };
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
    "source-over",
    "source-in",
    "source-out",
    "source-atop",
    "destination-over",
    "destination-in",
    "destination-out",
    "destination-atop",
    "lighter",
    "copy",
    "xor",
    "multiply",
    "screen",
    "overlay",
    "darken",
    "lighten",
    "color-dodge",
    "color-burn",
    "hard-light",
    "soft-light",
    "difference",
    "exclusion",
    "hue",
    "saturation",
    "color",
    "luminosity"
};
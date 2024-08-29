import { Context as ctx } from "@tryforge/forgescript";
import { CanvasManager, GradientManager } from "./classes";
export declare class Context extends ctx {
    canvasManager?: CanvasManager;
    gradientManager?: GradientManager;
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
    saturate = 7
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
    "source-over" = 0,
    "source-in" = 1,
    "source-out" = 2,
    "source-atop" = 3,
    "destination-over" = 4,
    "destination-in" = 5,
    "destination-out" = 6,
    "destination-atop" = 7,
    "lighter" = 8,
    "copy" = 9,
    "xor" = 10,
    "multiply" = 11,
    "screen" = 12,
    "overlay" = 13,
    "darken" = 14,
    "lighten" = 15,
    "color-dodge" = 16,
    "color-burn" = 17,
    "hard-light" = 18,
    "soft-light" = 19,
    "difference" = 20,
    "exclusion" = 21,
    "hue" = 22,
    "saturation" = 23,
    "color" = 24,
    "luminosity" = 25
}
//# sourceMappingURL=typings.d.ts.map
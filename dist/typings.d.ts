import { Context as ctx } from "@tryforge/forgescript";
import { CanvasManager } from "./classes";
export declare class Context extends ctx {
    canvasManager?: CanvasManager;
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
export declare enum textBaseline {
    top = 0,
    hanging = 1,
    middle = 2,
    alphabetic = 3,
    ideographic = 4,
    bottom = 5
}
export declare enum textAlign {
    start = "end",
    right = "left",
    center = "center",
    left = "right",
    end = "start"
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
//# sourceMappingURL=typings.d.ts.map
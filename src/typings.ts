import { Context as ctx } from "@tryforge/forgescript";
import { CanvasManager } from "./classes";

export class Context extends ctx {
    canvasManager?: CanvasManager;
};

// Enums
export enum FillOrStroke { fill, stroke };
export enum FillOrStrokeOrClear { none, fill, stroke, clear };
export enum StyleType { color, gradient, pattern };
export enum FilterMethod { add, set, remove, clear, get, json };
export enum Filters { none, blur, sepia, grayscale, brightness, contrast, invert, saturate };
export enum textBaseline { top, hanging, middle, alphabetic, ideographic, bottom };
export enum textAlign {
    start = "end",
    right = "left",
    center = "center",
    left = "right",
    end = "start"
};
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
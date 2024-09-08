"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompositingOperation = exports.MeasureTextProperty = exports.LineJoinShape = exports.FillRule = exports.GradientType = exports.TextAlign = exports.TextBaseline = exports.Filters = exports.FilterMethod = exports.StyleType = exports.WidthOrHeight = exports.FillOrStrokeOrClear = exports.FillOrStroke = exports.Context = void 0;
const forgescript_1 = require("@tryforge/forgescript");
class Context extends forgescript_1.Context {
    canvasManager;
    gradientManager;
}
exports.Context = Context;
;
// Enums
var FillOrStroke;
(function (FillOrStroke) {
    FillOrStroke[FillOrStroke["fill"] = 0] = "fill";
    FillOrStroke[FillOrStroke["stroke"] = 1] = "stroke";
})(FillOrStroke || (exports.FillOrStroke = FillOrStroke = {}));
;
var FillOrStrokeOrClear;
(function (FillOrStrokeOrClear) {
    FillOrStrokeOrClear[FillOrStrokeOrClear["none"] = 0] = "none";
    FillOrStrokeOrClear[FillOrStrokeOrClear["fill"] = 1] = "fill";
    FillOrStrokeOrClear[FillOrStrokeOrClear["stroke"] = 2] = "stroke";
    FillOrStrokeOrClear[FillOrStrokeOrClear["clear"] = 3] = "clear";
})(FillOrStrokeOrClear || (exports.FillOrStrokeOrClear = FillOrStrokeOrClear = {}));
;
var WidthOrHeight;
(function (WidthOrHeight) {
    WidthOrHeight[WidthOrHeight["width"] = 0] = "width";
    WidthOrHeight[WidthOrHeight["height"] = 1] = "height";
})(WidthOrHeight || (exports.WidthOrHeight = WidthOrHeight = {}));
;
var StyleType;
(function (StyleType) {
    StyleType[StyleType["color"] = 0] = "color";
    StyleType[StyleType["gradient"] = 1] = "gradient";
    StyleType[StyleType["pattern"] = 2] = "pattern";
})(StyleType || (exports.StyleType = StyleType = {}));
;
var FilterMethod;
(function (FilterMethod) {
    FilterMethod[FilterMethod["add"] = 0] = "add";
    FilterMethod[FilterMethod["set"] = 1] = "set";
    FilterMethod[FilterMethod["remove"] = 2] = "remove";
    FilterMethod[FilterMethod["clear"] = 3] = "clear";
    FilterMethod[FilterMethod["get"] = 4] = "get";
    FilterMethod[FilterMethod["json"] = 5] = "json";
})(FilterMethod || (exports.FilterMethod = FilterMethod = {}));
;
var Filters;
(function (Filters) {
    Filters[Filters["none"] = 0] = "none";
    Filters[Filters["blur"] = 1] = "blur";
    Filters[Filters["sepia"] = 2] = "sepia";
    Filters[Filters["grayscale"] = 3] = "grayscale";
    Filters[Filters["brightness"] = 4] = "brightness";
    Filters[Filters["contrast"] = 5] = "contrast";
    Filters[Filters["invert"] = 6] = "invert";
    Filters[Filters["saturate"] = 7] = "saturate";
})(Filters || (exports.Filters = Filters = {}));
;
var TextBaseline;
(function (TextBaseline) {
    TextBaseline[TextBaseline["top"] = 0] = "top";
    TextBaseline[TextBaseline["hanging"] = 1] = "hanging";
    TextBaseline[TextBaseline["middle"] = 2] = "middle";
    TextBaseline[TextBaseline["alphabetic"] = 3] = "alphabetic";
    TextBaseline[TextBaseline["ideographic"] = 4] = "ideographic";
    TextBaseline[TextBaseline["bottom"] = 5] = "bottom";
})(TextBaseline || (exports.TextBaseline = TextBaseline = {}));
;
var TextAlign;
(function (TextAlign) {
    TextAlign[TextAlign["start"] = 0] = "start";
    TextAlign[TextAlign["right"] = 1] = "right";
    TextAlign[TextAlign["center"] = 2] = "center";
    TextAlign[TextAlign["left"] = 3] = "left";
    TextAlign[TextAlign["end"] = 4] = "end";
})(TextAlign || (exports.TextAlign = TextAlign = {}));
;
var GradientType;
(function (GradientType) {
    GradientType[GradientType["linear"] = 0] = "linear";
    GradientType[GradientType["radial"] = 1] = "radial";
    GradientType[GradientType["conic"] = 2] = "conic";
})(GradientType || (exports.GradientType = GradientType = {}));
;
var FillRule;
(function (FillRule) {
    FillRule[FillRule["evenodd"] = 0] = "evenodd";
    FillRule[FillRule["nonzero"] = 1] = "nonzero";
})(FillRule || (exports.FillRule = FillRule = {}));
;
var LineJoinShape;
(function (LineJoinShape) {
    LineJoinShape[LineJoinShape["round"] = 0] = "round";
    LineJoinShape[LineJoinShape["bevel"] = 1] = "bevel";
    LineJoinShape[LineJoinShape["miter"] = 2] = "miter";
})(LineJoinShape || (exports.LineJoinShape = LineJoinShape = {}));
;
var MeasureTextProperty;
(function (MeasureTextProperty) {
    MeasureTextProperty[MeasureTextProperty["actualBoundingBoxAscent"] = 0] = "actualBoundingBoxAscent";
    MeasureTextProperty[MeasureTextProperty["actualBoundingBoxDescent"] = 1] = "actualBoundingBoxDescent";
    MeasureTextProperty[MeasureTextProperty["actualBoundingBoxLeft"] = 2] = "actualBoundingBoxLeft";
    MeasureTextProperty[MeasureTextProperty["actualBoundingBoxRight"] = 3] = "actualBoundingBoxRight";
    MeasureTextProperty[MeasureTextProperty["fontBoundingBoxAscent"] = 4] = "fontBoundingBoxAscent";
    MeasureTextProperty[MeasureTextProperty["fontBoundingBoxDescent"] = 5] = "fontBoundingBoxDescent";
    MeasureTextProperty[MeasureTextProperty["alphabeticBaseline"] = 6] = "alphabeticBaseline";
    MeasureTextProperty[MeasureTextProperty["emHeightAscent"] = 7] = "emHeightAscent";
    MeasureTextProperty[MeasureTextProperty["emHeightDescent"] = 8] = "emHeightDescent";
    MeasureTextProperty[MeasureTextProperty["width"] = 9] = "width";
})(MeasureTextProperty || (exports.MeasureTextProperty = MeasureTextProperty = {}));
;
var CompositingOperation;
(function (CompositingOperation) {
    CompositingOperation[CompositingOperation["source-over"] = 0] = "source-over";
    CompositingOperation[CompositingOperation["source-in"] = 1] = "source-in";
    CompositingOperation[CompositingOperation["source-out"] = 2] = "source-out";
    CompositingOperation[CompositingOperation["source-atop"] = 3] = "source-atop";
    CompositingOperation[CompositingOperation["destination-over"] = 4] = "destination-over";
    CompositingOperation[CompositingOperation["destination-in"] = 5] = "destination-in";
    CompositingOperation[CompositingOperation["destination-out"] = 6] = "destination-out";
    CompositingOperation[CompositingOperation["destination-atop"] = 7] = "destination-atop";
    CompositingOperation[CompositingOperation["lighter"] = 8] = "lighter";
    CompositingOperation[CompositingOperation["copy"] = 9] = "copy";
    CompositingOperation[CompositingOperation["xor"] = 10] = "xor";
    CompositingOperation[CompositingOperation["multiply"] = 11] = "multiply";
    CompositingOperation[CompositingOperation["screen"] = 12] = "screen";
    CompositingOperation[CompositingOperation["overlay"] = 13] = "overlay";
    CompositingOperation[CompositingOperation["darken"] = 14] = "darken";
    CompositingOperation[CompositingOperation["lighten"] = 15] = "lighten";
    CompositingOperation[CompositingOperation["color-dodge"] = 16] = "color-dodge";
    CompositingOperation[CompositingOperation["color-burn"] = 17] = "color-burn";
    CompositingOperation[CompositingOperation["hard-light"] = 18] = "hard-light";
    CompositingOperation[CompositingOperation["soft-light"] = 19] = "soft-light";
    CompositingOperation[CompositingOperation["difference"] = 20] = "difference";
    CompositingOperation[CompositingOperation["exclusion"] = 21] = "exclusion";
    CompositingOperation[CompositingOperation["hue"] = 22] = "hue";
    CompositingOperation[CompositingOperation["saturation"] = 23] = "saturation";
    CompositingOperation[CompositingOperation["color"] = 24] = "color";
    CompositingOperation[CompositingOperation["luminosity"] = 25] = "luminosity";
})(CompositingOperation || (exports.CompositingOperation = CompositingOperation = {}));
;
//# sourceMappingURL=typings.js.map
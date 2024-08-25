"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeasureTextProperty = exports.textAlign = exports.textBaseline = exports.Filters = exports.FilterMethod = exports.StyleType = exports.FillOrStrokeOrClear = exports.FillOrStroke = exports.Context = void 0;
const forgescript_1 = require("@tryforge/forgescript");
class Context extends forgescript_1.Context {
    canvasManager;
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
var textBaseline;
(function (textBaseline) {
    textBaseline[textBaseline["top"] = 0] = "top";
    textBaseline[textBaseline["hanging"] = 1] = "hanging";
    textBaseline[textBaseline["middle"] = 2] = "middle";
    textBaseline[textBaseline["alphabetic"] = 3] = "alphabetic";
    textBaseline[textBaseline["ideographic"] = 4] = "ideographic";
    textBaseline[textBaseline["bottom"] = 5] = "bottom";
})(textBaseline || (exports.textBaseline = textBaseline = {}));
;
var textAlign;
(function (textAlign) {
    textAlign["start"] = "end";
    textAlign["right"] = "left";
    textAlign["center"] = "center";
    textAlign["left"] = "right";
    textAlign["end"] = "start";
})(textAlign || (exports.textAlign = textAlign = {}));
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
//# sourceMappingURL=typings.js.map
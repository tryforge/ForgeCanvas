"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FCError = exports.CanvasUtil = exports.Colors = exports.hexRegex = exports.rgbaRegex = exports.filterRegex = exports.fontRegex = void 0;
exports.loadFrame = loadFrame;
exports.parseArgs = parseArgs;
var canvas_1 = require("@napi-rs/canvas");
var gifsx_1 = require("@gifsx/gifsx");
var __1 = require("..");
exports.fontRegex = /^\s*(?=(?:(?:[-a-z]+\s*){0,2}(italic|oblique))?)(?=(?:(?:[-a-z]+\s*){0,2}(small-caps))?)(?=(?:(?:[-a-z]+\s*){0,2}(bold(?:er)?|lighter|[1-9]00))?)(?:(?:normal|\1|\2|\3)\s*){0,3}((?:xx?-)?(?:small|large)|medium|smaller|larger|[.\d]+(?:\%|in|[cem]m|ex|p[ctx]))(?:\s*\/\s*(normal|[.\d]+(?:\%|in|[cem]m|ex|p[ctx])))?\s*([-,\'\sa-z_.0-9]+?)\s*$/i;
exports.filterRegex = /([a-zA-Z-]+)\(([^)]+)\)/g;
exports.rgbaRegex = /^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})(\s*,\s*(0|1|0?\.\d+))?\s*\)$/;
exports.hexRegex = /^#?([0-9A-Fa-f]{3,4}){1,2}$/;
exports.Colors = {
    White: '#ffffff',
    Aqua: '#1abc9c',
    Green: '#57f287',
    Blue: '#3498db',
    Yellow: '#fee75c',
    Purple: '#9b59b6',
    LuminousVividPink: '#e91e63',
    Fuchsia: '#eb459e',
    Gold: '#f1c40f',
    Orange: '#e67e22',
    Red: '#ed4245',
    RubberDuck: '#FFD700',
    Grey: '#95a5a6',
    Navy: '#34495e',
    DarkAqua: '#11806a',
    DarkGreen: '#1f8b4c',
    DarkBlue: '#206694',
    DarkPurple: '#71368a',
    DarkVividPink: '#ad1457',
    DarkGold: '#c27c0e',
    DarkOrange: '#a84300',
    DarkRed: '#992d22',
    DarkGrey: '#979c9f',
    DarkerGrey: '#7f8c8d',
    LightGrey: '#bcc0c0',
    DarkNavy: '#2c3e50',
    Blurple: '#5865f2',
    Greyple: '#99aab5',
    DarkButNotBlack: '#2c2f33',
    NotQuiteBlack: '#23272a'
};
exports.CanvasUtil = {
    isValidFont: function (font) {
        if (!font || !exports.fontRegex.test(font))
            return false;
        var res = exports.fontRegex.exec(font);
        if (!(res === null || res === void 0 ? void 0 : res[0]))
            return false;
        var families = res[6].split(',').map(function (x) { return x === null || x === void 0 ? void 0 : x.trim(); });
        for (var _i = 0, families_1 = families; _i < families_1.length; _i++) {
            var family = families_1[_i];
            if (!canvas_1.GlobalFonts.has(family.replace(/['',]/g, '')))
                return false;
        }
        return true;
    },
    resolveStyle: function (self, ctx, canvas, style) { return __awaiter(void 0, void 0, void 0, function () {
        var s, gradient, splits, type, repeat, image, canvas_2, img;
        var _a, _b, _c, _d, _e, _f;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    if (!style)
                        return [2 /*return*/, '#000000'];
                    s = style.split('://');
                    if (s[0] === 'gradient') {
                        gradient = (_a = ctx.gradientManager) === null || _a === void 0 ? void 0 : _a.get(s.slice(1).join('://'));
                        if (!gradient)
                            return [2 /*return*/, self.customError(FCError.NoGradient)];
                        return [2 /*return*/, gradient];
                    }
                    if (!(s[0] === 'pattern')) return [3 /*break*/, 5];
                    splits = s.slice(1).join('://').split(':'), type = (_b = splits.shift()) === null || _b === void 0 ? void 0 : _b.toLowerCase(), repeat = splits.length > 0 && [
                        'repeat', 'repeat-x',
                        'repeat-y', 'no-repeat'
                    ].includes(splits[splits.length - 1])
                        ? splits.pop() : null;
                    image = void 0;
                    if (!(type === 'canvas')) return [3 /*break*/, 1];
                    canvas_2 = (_c = ctx.canvasManager) === null || _c === void 0 ? void 0 : _c.get(repeat ? splits.join(':') : splits.join());
                    if (!canvas_2)
                        return [2 /*return*/, self.customError(FCError.NoCanvas)];
                    image = canvas_2.ctx.canvas;
                    return [3 /*break*/, 4];
                case 1:
                    if (!(type === 'images' && ((_d = splits[0]) === null || _d === void 0 ? void 0 : _d.startsWith('//')))) return [3 /*break*/, 2];
                    img = (_e = ctx === null || ctx === void 0 ? void 0 : ctx.imageManager) === null || _e === void 0 ? void 0 : _e.get(splits.join(':').slice(2));
                    if (!img)
                        return [2 /*return*/, self.customError(FCError.NoImage)];
                    image = img;
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, (0, canvas_1.loadImage)(repeat ? splits.join(':') : "".concat(type, ":").concat(splits.join(':')))];
                case 3:
                    image = _g.sent();
                    _g.label = 4;
                case 4: return [2 /*return*/, canvas.ctx.createPattern(image, repeat)];
                case 5: return [2 /*return*/, (_f = (exports.hexRegex.test(style) ? style :
                        exports.rgbaRegex.test(style) ? exports.CanvasUtil.rgbaStringToHex(style) :
                            exports.Colors[style])) !== null && _f !== void 0 ? _f : '#000000'];
            }
        });
    }); },
    resolveImage: function (self, ctx, src) { return __awaiter(void 0, void 0, void 0, function () {
        var splitted, protocol, img, _a, size, data, _b, width, height, canvas, context, imageData, frame, width, height, buffer, canvas, context, imageData, image, canvas;
        var _c, _d, _e, _f, _g;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    splitted = src.split('//');
                    protocol = splitted[0].slice(0, -1);
                    img = src;
                    if (['rgba', 'rgb', 'hex'].includes(protocol)) {
                        _a = parseArgs(src, splitted[0].length + 2, 2), size = _a[0], data = _a[1];
                        _b = size.split('x').map(Number), width = _b[0], height = _b[1];
                        canvas = (0, canvas_1.createCanvas)(width, height);
                        context = canvas.getContext('2d');
                        imageData = context.createImageData(width, height);
                        imageData.data.set(new Uint8ClampedArray(protocol === 'hex'
                            ? (0, gifsx_1.hexToRgba)(data.split(',').map(function (x) { return x.trim(); }))
                            : protocol === 'rgb'
                                ? data.split(',').map(Number).flatMap(function (v, i) {
                                    if ((i + 1) % 3 === 0)
                                        return [v, 255];
                                    return [v];
                                })
                                : data.split(',').map(Number)));
                        context.putImageData(imageData, 0, 0);
                        img = canvas.toBuffer('image/png');
                    }
                    else if (protocol === 'frame') {
                        frame = (_c = ctx.gifManager) === null || _c === void 0 ? void 0 : _c.getFrame(src.slice(8));
                        if (!frame)
                            return [2 /*return*/, self.customError(FCError.NoFrame)];
                        width = frame.width, height = frame.height, buffer = frame.buffer;
                        canvas = (0, canvas_1.createCanvas)(width, height);
                        context = canvas.getContext('2d');
                        imageData = context.createImageData(width, height);
                        imageData.data.set(buffer.length === width * height * 4
                            ? buffer : (0, gifsx_1.indexedToRgba)(Uint8Array.from(buffer), (_d = frame.palette) !== null && _d !== void 0 ? _d : Uint8Array.from([]), frame.transparent));
                        context.putImageData(imageData, 0, 0);
                        img = canvas.toBuffer('image/png');
                    }
                    else if (protocol === 'images') {
                        image = (_e = ctx.imageManager) === null || _e === void 0 ? void 0 : _e.get(splitted.slice(1).join('//'));
                        if (!image)
                            return [2 /*return*/, self.customError(FCError.NoImage)];
                        img = image;
                    }
                    else if (protocol === 'canvas') {
                        canvas = (_f = ctx.canvasManager) === null || _f === void 0 ? void 0 : _f.get(splitted.slice(1).join('//'));
                        if (!canvas)
                            return [2 /*return*/, self.customError(FCError.NoCanvas)];
                        img = canvas.buffer('image/png');
                    }
                    else if (src === null || src === void 0 ? void 0 : src.includes('<svg'))
                        img = "data:image/svg+xml;base64,".concat((_g = Buffer.from(src)) === null || _g === void 0 ? void 0 : _g.toString('base64'));
                    return [4 /*yield*/, (0, canvas_1.loadImage)(img)
                            .catch(function (e) { return self.customError(e.toString()); })];
                case 1: return [2 /*return*/, _h.sent()];
            }
        });
    }); },
    rgbaStringToHex: function (rgba) {
        var match = rgba.match(exports.rgbaRegex);
        return (0, gifsx_1.rgbaToHex)(Uint8Array.from([
            Number.parseInt(match[1], 10),
            Number.parseInt(match[2], 10),
            Number.parseInt(match[3], 10),
            match[5] ? Number.parseFloat(match[5]) : 255
        ]), false, true)[0];
    },
    resolveFrame: function (self, ctx, frame, speed) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, _b, size, data, _c, width, height, _d, size, data, _e, width, height, _f, size, data, _g, width, height, _h, size, data, _j, width, height, img, canvas;
        var _k, _l;
        return __generator(this, function (_m) {
            switch (_m.label) {
                case 0:
                    _a = frame.substring(0, frame.indexOf(':'));
                    switch (_a) {
                        case 'rgba': return [3 /*break*/, 1];
                        case 'hex': return [3 /*break*/, 2];
                        case 'rgb': return [3 /*break*/, 3];
                        case 'indexed': return [3 /*break*/, 4];
                        case 'images': return [3 /*break*/, 5];
                        case 'canvas': return [3 /*break*/, 7];
                    }
                    return [3 /*break*/, 8];
                case 1:
                    {
                        _b = parseArgs(frame, 'rgba://', 2), size = _b[0], data = _b[1];
                        _c = size.split('x').map(Number), width = _c[0], height = _c[1];
                        return [2 /*return*/, gifsx_1.Frame.fromRgba(width, height, Uint8Array.from(data.split(',').map(Number)), speed)];
                    }
                    _m.label = 2;
                case 2:
                    {
                        _d = parseArgs(frame, 'hex://', 2), size = _d[0], data = _d[1];
                        _e = size.split('x').map(Number), width = _e[0], height = _e[1];
                        return [2 /*return*/, gifsx_1.Frame.fromHex(width, height, data.split(',').map(function (x) { return x.trim(); }), speed)];
                    }
                    _m.label = 3;
                case 3:
                    {
                        _f = parseArgs(frame, 'rgb://', 2), size = _f[0], data = _f[1];
                        _g = size.split('x').map(Number), width = _g[0], height = _g[1];
                        return [2 /*return*/, gifsx_1.Frame.fromRgb(width, height, Uint8Array.from(data.split(',').map(Number)), speed)];
                    }
                    _m.label = 4;
                case 4:
                    {
                        _h = parseArgs(frame, 'indexed://', 2), size = _h[0], data = _h[1];
                        _j = size.split('x').map(Number), width = _j[0], height = _j[1];
                        return [2 /*return*/, gifsx_1.Frame.fromIndexedPixels(width, height, Uint8Array.from(data.split(',').map(Number)))];
                    }
                    _m.label = 5;
                case 5:
                    img = (_k = ctx.imageManager) === null || _k === void 0 ? void 0 : _k.get(frame.slice(9));
                    if (!img)
                        return [2 /*return*/, self.customError(FCError.NoImage)];
                    return [4 /*yield*/, loadFrame(img, speed)];
                case 6: return [2 /*return*/, _m.sent()];
                case 7:
                    {
                        canvas = (_l = ctx.canvasManager) === null || _l === void 0 ? void 0 : _l.get(frame.slice(9));
                        if (!canvas)
                            return [2 /*return*/, self.customError(FCError.NoCanvas)];
                        return [2 /*return*/, gifsx_1.Frame.fromRgba(canvas.width, canvas.height, Uint8Array.from(canvas.ctx.getImageData(0, 0, canvas.width, canvas.height).data), speed)];
                    }
                    _m.label = 8;
                case 8: return [4 /*yield*/, loadFrame(frame, speed)];
                case 9: return [2 /*return*/, _m.sent()];
            }
        });
    }); },
    calculateRectAlignOrBaseline: function (XorY, WorH, AorB) {
        AorB = typeof AorB === 'string'
            ? __1.RectAlign[AorB]
            : AorB;
        return AorB === __1.RectAlign.center
            ? XorY - WorH / 2
            : AorB === __1.RectAlign.right || AorB === __1.RectBaseline.top
                ? XorY - WorH
                : XorY;
    },
    parseFilters: function (filters) {
        var result = [];
        var match;
        while ((match = exports.filterRegex.exec(filters)) !== null) {
            var raw = match[0], filter = match[1], value = match[2];
            result.push({ filter: filter, value: value, raw: raw });
        }
        return result;
    }
};
function loadFrame(src, speed) {
    return __awaiter(this, void 0, void 0, function () {
        var img, canvas, ctx;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, canvas_1.loadImage)(src)];
                case 1:
                    img = _a.sent();
                    canvas = (0, canvas_1.createCanvas)(img.width, img.height);
                    ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0);
                    return [2 /*return*/, gifsx_1.Frame.fromRgba(canvas.width, canvas.height, Uint8Array.from(ctx.getImageData(0, 0, canvas.width, canvas.height).data), speed)];
            }
        });
    });
}
function parseArgs(str, prefix, length, rest) {
    var args = str.slice(typeof prefix === 'string' ? prefix.length : prefix).split(':');
    if (!rest ? args.length !== length : args.length < length)
        throw new Error("".concat(prefix, " expects ").concat(length, " arguments"));
    return args;
}
var FCError;
(function (FCError) {
    FCError["NoCanvas"] = "No canvas with provided name found";
    FCError["NoImage"] = "No image with provided name found";
    FCError["NoGradient"] = "No gradient with provided name found";
    FCError["NoStyle"] = "No style provided";
    FCError["NoFilter"] = "No filter provided";
    FCError["NoFilterOrValue"] = "No filter or value provided";
    FCError["ImageFail"] = "Failed to load an image";
    FCError["InvalidOffset"] = "Offset must be between 0 and 100";
    FCError["InvalidRectType"] = "Invalid rect type provided (Expected fill/stroke/clear)";
    FCError["InvalidLineDashSegments"] = "Invalid line dash segments provided (Expected array of numbers)";
    FCError["NoEncoder"] = "No GIF encoder with provided name found";
    FCError["NoDecoder"] = "No GIF decoder with provided name found";
    FCError["NoDecodeOptions"] = "No decode options with provided name found";
    FCError["NoNeuQuant"] = "No NeuQuant Instance with provided name found";
    FCError["NoFrame"] = "No frame with provided name found";
    FCError["NoSizeAndPalette"] = "No size and palette has been set";
    FCError["FrameFail"] = "Failed to load a frame";
    FCError["NoBarData"] = "No bar data provided";
    FCError["InvalidBarData"] = "Invalid bar data provided";
    FCError["InvalidBarType"] = "Invalid bar type provided (Expected normal/pie)";
    FCError["InvalidBarDirection"] = "Invalid bar direction provided (Expected horizontal/vertical)";
    FCError["NoSize"] = "No size has been set";
    FCError["NoPath"] = "No path provided";
    FCError["ArrayExpected"] = "Array expected";
    FCError["InvalidWidthOrHeight"] = "Invalid width or height provided";
})(FCError || (exports.FCError = FCError = {}));

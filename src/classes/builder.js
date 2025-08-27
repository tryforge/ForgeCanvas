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
exports.CanvasBuilder = void 0;
var gifsx_1 = require("@gifsx/gifsx");
var canvas_1 = require("@napi-rs/canvas");
var __1 = require("..");
var CanvasBuilder = /** @class */ (function () {
    function CanvasBuilder(width, height) {
        this.util = __1.CanvasUtil;
        this.customProperties = {};
        this.ctx = (0, canvas_1.createCanvas)(width, height).getContext('2d');
    }
    Object.defineProperty(CanvasBuilder.prototype, "width", {
        get: function () { return this.ctx.canvas.width; },
        set: function (val) { this.resize(val, this.height); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CanvasBuilder.prototype, "height", {
        get: function () { return this.ctx.canvas.height; },
        set: function (val) { this.resize(this.width, val); },
        enumerable: false,
        configurable: true
    });
    CanvasBuilder.prototype.rect = function (type, x, y, width, height, radius) {
        var ctx = this.ctx;
        width !== null && width !== void 0 ? width : (width = ctx.canvas.width - x);
        height !== null && height !== void 0 ? height : (height = ctx.canvas.height - y);
        radius !== null && radius !== void 0 ? radius : (radius = 0);
        if (this.customProperties.rectAlign)
            x = __1.CanvasUtil.calculateRectAlignOrBaseline(x, width, this.customProperties.rectAlign);
        if (this.customProperties.rectBaseline)
            y = __1.CanvasUtil.calculateRectAlignOrBaseline(y, height, this.customProperties.rectBaseline);
        if (type === __1.FillOrStrokeOrClear.none)
            return ctx.roundRect(x, y, width, height, radius);
        if (!radius) {
            if (type === __1.FillOrStrokeOrClear.fill)
                ctx.fillRect(x, y, width, height);
            if (type === __1.FillOrStrokeOrClear.stroke)
                ctx.strokeRect(x, y, width, height);
            if (type === __1.FillOrStrokeOrClear.clear)
                ctx.clearRect(x, y, width, height);
            return;
        }
        ctx.save();
        ctx.beginPath();
        ctx.roundRect(x, y, width, height, radius);
        if (type === __1.FillOrStrokeOrClear.fill)
            ctx.fillRect(x, y, width, height);
        else if (type === __1.FillOrStrokeOrClear.stroke)
            ctx.strokeRect(x, y, width, height);
        else
            (ctx.clip(), ctx.clearRect(x, y, width, height));
        ctx.restore();
    };
    ;
    CanvasBuilder.prototype.text = function (type, text, x, y, font, maxWidth, multiline, wrap, lineOffset) {
        var _a;
        var ctx = this.ctx, fontsize = Number.parseFloat(__1.fontRegex.exec(font)[4]), lines = multiline ? text.split('\n') : [text], func = function (text, x, y, maxWidth) {
            return type === __1.FillOrStroke.fill
                ? ctx.fillText(text, x, y, maxWidth)
                : ctx.strokeText(text, x, y, maxWidth);
        };
        maxWidth !== null && maxWidth !== void 0 ? maxWidth : (maxWidth = undefined);
        lineOffset !== null && lineOffset !== void 0 ? lineOffset : (lineOffset = 0);
        ctx.font = font;
        if (multiline || wrap) {
            for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
                var t = lines_1[_i];
                if (wrap) {
                    var line = '';
                    var words = t.split(' ');
                    for (var i = 0; i < words.length; i++) {
                        var word = words[i];
                        if (!((_a = word === null || word === void 0 ? void 0 : word.trim()) === null || _a === void 0 ? void 0 : _a.length))
                            return;
                        if (maxWidth && ctx.measureText(line + word + ' ').width > maxWidth && i > 0) {
                            func(line, x, y, maxWidth);
                            line = word + ' ';
                            y += fontsize + lineOffset;
                        }
                        else
                            line += word + ' ';
                    }
                    func(line, x, y, maxWidth);
                    y += fontsize + lineOffset;
                }
                else {
                    func(t, x, y, maxWidth);
                    y += fontsize + lineOffset;
                }
            }
        }
        else
            func(text, x, y, maxWidth);
    };
    CanvasBuilder.prototype.drawImage = function (image, x, y, width, height, radius) {
        return __awaiter(this, void 0, void 0, function () {
            var ctx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ctx = this.ctx;
                        return [4 /*yield*/, (0, canvas_1.loadImage)(image)];
                    case 1:
                        image = _a.sent();
                        width !== null && width !== void 0 ? width : (width = image.width);
                        height !== null && height !== void 0 ? height : (height = image.height);
                        if (this.customProperties.rectAlign)
                            x = __1.CanvasUtil.calculateRectAlignOrBaseline(x, width, this.customProperties.rectAlign);
                        if (this.customProperties.rectBaseline)
                            y = __1.CanvasUtil.calculateRectAlignOrBaseline(y, height, this.customProperties.rectBaseline);
                        if (!radius)
                            return [2 /*return*/, ctx.drawImage(image, x, y, width, height)];
                        ctx.save();
                        ctx.beginPath();
                        ctx.roundRect(x, y, width, height, radius);
                        ctx.clip();
                        ctx.drawImage(image, x, y, width, height);
                        ctx.restore();
                        return [2 /*return*/];
                }
            });
        });
    };
    CanvasBuilder.prototype.drawProgressBar = function (x, y, width, height, progress, config) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        if (config === void 0) { config = {}; }
        var ctx = this.ctx;
        progress = Math.min(progress || 0, 100) / 100;
        var options = {
            style: (_a = config === null || config === void 0 ? void 0 : config.style) !== null && _a !== void 0 ? _a : '#FFFFFF',
            background: {
                enabled: (_c = (_b = config === null || config === void 0 ? void 0 : config.background) === null || _b === void 0 ? void 0 : _b.enabled) !== null && _c !== void 0 ? _c : true,
                style: (_e = (_d = config === null || config === void 0 ? void 0 : config.background) === null || _d === void 0 ? void 0 : _d.style) !== null && _e !== void 0 ? _e : '#000000',
                radius: (_f = config === null || config === void 0 ? void 0 : config.background) === null || _f === void 0 ? void 0 : _f.radius,
                type: (_h = (_g = config === null || config === void 0 ? void 0 : config.background) === null || _g === void 0 ? void 0 : _g.type) !== null && _h !== void 0 ? _h : 'fill',
                padding: (_k = (_j = config === null || config === void 0 ? void 0 : config.background) === null || _j === void 0 ? void 0 : _j.padding) !== null && _k !== void 0 ? _k : 0
            },
            type: (_l = config === null || config === void 0 ? void 0 : config.type) !== null && _l !== void 0 ? _l : 'fill',
            radius: config === null || config === void 0 ? void 0 : config.radius,
            direction: (_m = config === null || config === void 0 ? void 0 : config.direction) !== null && _m !== void 0 ? _m : 'horizontal',
            clip: config === null || config === void 0 ? void 0 : config.clip,
            left: config === null || config === void 0 ? void 0 : config.left
        };
        if (this.customProperties.rectAlign)
            x = __1.CanvasUtil.calculateRectAlignOrBaseline(x, width, this.customProperties.rectAlign);
        if (this.customProperties.rectBaseline)
            y = __1.CanvasUtil.calculateRectAlignOrBaseline(y, height, this.customProperties.rectBaseline);
        if (options.background.enabled) {
            if (options.background.type !== 'clear') {
                ctx.save();
                ctx["".concat(options.background.type, "Style")] = options.background.style;
                ctx.beginPath();
                ctx.roundRect(x, y, width, height, options.background.radius);
                ctx[options.background.type]();
                ctx.restore();
            }
            else
                this.rect(__1.FillOrStrokeOrClear.clear, x, y, width, height, options.background.radius);
        }
        if (options.background.padding) {
            width = width - options.background.padding * 2;
            height = height - options.background.padding * 2;
            x = x + options.background.padding;
            y = y + +options.background.padding;
        }
        var pwidth = Math.min(['horizontal', 'both'].includes(options.direction)
            ? width * progress : width, width);
        var pheight = Math.min(['vertical', 'both'].includes(options.direction)
            ? height * progress : height, height);
        if (options.type === 'clear')
            return (this.rect(__1.FillOrStrokeOrClear.clear, x, y, pwidth, pheight, options.radius), [x, y, width, height, pwidth, pheight]);
        ctx.save();
        if (options.clip !== undefined) {
            ctx.beginPath();
            ctx.roundRect(x, y, width, height, options.clip);
            ctx.clip();
        }
        if (options.left) {
            ctx.fillStyle = options.left;
            ctx.beginPath();
            ctx.roundRect(x, y, width, height, options.radius);
            ctx.fill();
        }
        ctx["".concat(options.type, "Style")] = options.style;
        ctx.beginPath();
        ctx.roundRect(x, y, pwidth, pheight, options.radius);
        ctx[options.type]();
        ctx.restore();
        return [x, y, width, height, pwidth, pheight];
    };
    CanvasBuilder.prototype.drawPieChart = function (x, y, width, height, data, config) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        if (config === void 0) { config = {}; }
        var ctx = this.ctx;
        var options = {
            type: (_a = config.type) !== null && _a !== void 0 ? _a : 'fill',
            background: {
                enabled: (_c = (_b = config.background) === null || _b === void 0 ? void 0 : _b.enabled) !== null && _c !== void 0 ? _c : true,
                style: (_e = (_d = config.background) === null || _d === void 0 ? void 0 : _d.style) !== null && _e !== void 0 ? _e : '#000000',
                radius: (_f = config.background) === null || _f === void 0 ? void 0 : _f.radius,
                type: (_h = (_g = config.background) === null || _g === void 0 ? void 0 : _g.type) !== null && _h !== void 0 ? _h : 'fill',
                padding: (_k = (_j = config.background) === null || _j === void 0 ? void 0 : _j.padding) !== null && _k !== void 0 ? _k : 0
            },
            radius: (_l = config.radius) !== null && _l !== void 0 ? _l : Math.min(width, height) / 2,
        };
        if (this.customProperties.rectAlign)
            x = __1.CanvasUtil.calculateRectAlignOrBaseline(x, width, this.customProperties.rectAlign);
        if (this.customProperties.rectBaseline)
            y = __1.CanvasUtil.calculateRectAlignOrBaseline(y, height, this.customProperties.rectBaseline);
        if (options.background.enabled) {
            if (options.background.type !== 'clear') {
                ctx.save();
                ctx["".concat(options.background.type, "Style")] = options.background.style;
                ctx.beginPath();
                ctx.roundRect(x, y, width, height, options.background.radius);
                ctx[options.background.type]();
                ctx.restore();
            }
            else
                this.rect(__1.FillOrStrokeOrClear.clear, x, y, width, height, options.background.radius);
        }
        if (options.background.padding) {
            width = width - options.background.padding * 2;
            height = height - options.background.padding * 2;
            x = x + options.background.padding;
            y = y + options.background.padding;
        }
        var total = data.reduce(function (acc, val) { return acc + val.value; }, 0);
        var angle = 0;
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var seg = data_1[_i];
            var angl = angle + (seg.value / total) * Math.PI * 2;
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(x + width / 2, y + height / 2);
            ctx.arc(x + width / 2, y + height / 2, Math.min(width, height) / 2, angle, angl);
            ctx.arc(x + width / 2, y + height / 2, (_m = options.radius) !== null && _m !== void 0 ? _m : 0, angl, angle, true);
            ctx.lineTo(x + width / 2, y + height / 2);
            ctx.closePath();
            ctx.fillStyle = seg.style;
            ctx.fill();
            ctx.restore();
            angle = angl;
        }
    };
    CanvasBuilder.prototype.measureText = function (text, font) {
        var ctx = this.ctx;
        ctx.fillStyle = '#000000';
        ctx.font = font;
        return ctx.measureText(text);
    };
    CanvasBuilder.prototype.filter = function (method, filter, value) {
        var _a, _b, _c, _d;
        var ctx = this.ctx;
        if (filter && typeof filter === 'string')
            filter = __1.Filters[filter];
        var PxOrPerc = filter === __1.Filters.grayscale || filter === __1.Filters.sepia ? '%' :
            (filter === __1.Filters.blur ? 'px' : '');
        if (method === __1.FilterMethod.add) {
            if (!filter || !value)
                throw new Error(__1.FCError.NoFilterOrValue);
            var result = __1.CanvasUtil.parseFilters((ctx.filter === 'none' ? '' : ctx.filter)
                + "".concat(__1.Filters[filter], "(").concat(value + PxOrPerc, ")"));
            ctx.filter = ((_b = (_a = result === null || result === void 0 ? void 0 : result.map(function (x) { return x === null || x === void 0 ? void 0 : x.raw; })) === null || _a === void 0 ? void 0 : _a.join(' ')) === null || _b === void 0 ? void 0 : _b.trim()) || 'none';
        }
        else if (method === __1.FilterMethod.set) {
            if (!filter || !value)
                throw new Error(__1.FCError.NoFilterOrValue);
            ctx.filter = "".concat(__1.Filters[filter], "(").concat(value + PxOrPerc, ")");
        }
        else if (method === __1.FilterMethod.remove) {
            if (!filter)
                throw new Error(__1.FCError.NoFilter);
            var filters = __1.CanvasUtil.parseFilters(ctx.filter);
            var index = filters.findIndex(function (obj) { return (obj === null || obj === void 0 ? void 0 : obj.filter) === __1.Filters[filter]; });
            if (index !== -1)
                filters.splice(index, 1);
            ctx.filter = filters.length > 0
                ? (_d = (_c = filters === null || filters === void 0 ? void 0 : filters.map(function (x) { return x === null || x === void 0 ? void 0 : x.raw; })) === null || _c === void 0 ? void 0 : _c.join(' ')) === null || _d === void 0 ? void 0 : _d.trim()
                : 'none';
        }
        else if (method === __1.FilterMethod.clear)
            ctx.filter = 'none';
        else if (method === __1.FilterMethod.get)
            return ctx.filter;
        else if (method === __1.FilterMethod.json)
            return __1.CanvasUtil.parseFilters(ctx.filter);
        return undefined;
    };
    CanvasBuilder.prototype.rotate = function (angle) {
        var ctx = this.ctx;
        var centerX = ctx.canvas.width / 2;
        var centerY = ctx.canvas.height / 2;
        ctx.translate(centerX, centerY);
        ctx.rotate((angle * Math.PI) / 180);
        ctx.translate(-centerX, -centerY);
    };
    CanvasBuilder.prototype.trim = function () {
        var ctx = this.ctx, canvas = ctx.canvas, pixels = ctx.getImageData(0, 0, canvas.width, canvas.height), l = pixels.data.length, i, bound = {
            top: canvas.height,
            left: canvas.width,
            right: 0,
            bottom: 0
        }, x, y;
        for (i = 0; i < l; i += 4) {
            if (pixels.data[i + 3] === 0)
                continue;
            x = (i / 4) % canvas.width;
            y = Math.floor((i / 4) / canvas.width);
            if (x < bound.left)
                bound.left = x;
            if (y < bound.top)
                bound.top = y;
            if (y > bound.bottom)
                bound.bottom = y;
            if (x > bound.right)
                bound.right = x;
        }
        var height = bound.bottom - bound.top + 1;
        var width = bound.right - bound.left + 1;
        var trimmed = ctx.getImageData(bound.left, bound.top, width, height);
        canvas.width = width;
        canvas.height = height;
        ctx.putImageData(trimmed, 0, 0);
    };
    CanvasBuilder.prototype.getPixels = function (x, y, width, height, t) {
        var ctx = this.ctx;
        width !== null && width !== void 0 ? width : (width = ctx.canvas.width);
        height !== null && height !== void 0 ? height : (height = ctx.canvas.height);
        var data = ctx.getImageData(x, y, width, height).data;
        if (t === __1.ColorDataType.Rgba)
            return Array.from(data);
        return (0, gifsx_1.rgbaToHex)(Uint8Array.from(data), false, true);
    };
    CanvasBuilder.prototype.setPixels = function (x, y, width, height, colors, t) {
        var ctx = this.ctx;
        width !== null && width !== void 0 ? width : (width = ctx.canvas.width);
        height !== null && height !== void 0 ? height : (height = ctx.canvas.height);
        var data = ctx.createImageData(width, height);
        if (t !== __1.ColorDataType.Rgba)
            data.data.set(Uint8ClampedArray.from((0, gifsx_1.hexToRgba)(colors)));
        else
            data.data.set(Uint8ClampedArray.from(colors));
        ctx.putImageData(data, x, y);
    };
    CanvasBuilder.prototype.resize = function (width, height) {
        var ctx = this.ctx, data = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.canvas.width = width;
        ctx.canvas.height = height;
        ctx.putImageData(data, 0, 0);
    };
    CanvasBuilder.prototype.dataUrl = function (mime) {
        return this.ctx.canvas.toDataURL(mime !== null && mime !== void 0 ? mime : 'image/png');
    };
    CanvasBuilder.prototype.buffer = function (mime) {
        // @ts-ignore
        return this.ctx.canvas.toBuffer(mime !== null && mime !== void 0 ? mime : 'image/png');
    };
    return CanvasBuilder;
}());
exports.CanvasBuilder = CanvasBuilder;

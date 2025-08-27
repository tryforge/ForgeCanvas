"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.NeuQuantManager = exports.GIFManager = exports.ImageManager = exports.GradientManager = exports.CanvasManager = void 0;
var canvas_1 = require("@napi-rs/canvas");
var builder_1 = require("./builder");
var __1 = require("../");
var Manager = /** @class */ (function () {
    function Manager() {
        this.map = new Map();
    }
    Manager.prototype.get = function (name) { return this.map.get(name); };
    Manager.prototype.remove = function (name) { this.map.delete(name); };
    return Manager;
}());
var CanvasManager = /** @class */ (function (_super) {
    __extends(CanvasManager, _super);
    function CanvasManager() {
        var _this = _super.call(this) || this;
        _this.current = [];
        return _this;
    }
    Object.defineProperty(CanvasManager.prototype, "lastCurrent", {
        get: function () {
            return this.current[this.current.length - 1];
        },
        enumerable: false,
        configurable: true
    });
    CanvasManager.prototype.set = function (name, a, b) {
        if (typeof a === 'number')
            this.map.set(name, new builder_1.CanvasBuilder(a, b !== null && b !== void 0 ? b : a));
        else
            this.map.set(name, a);
    };
    return CanvasManager;
}(Manager));
exports.CanvasManager = CanvasManager;
var GradientManager = /** @class */ (function (_super) {
    __extends(GradientManager, _super);
    function GradientManager() {
        var _this = _super.call(this) || this;
        _this.ctx = (0, canvas_1.createCanvas)(1, 1).getContext('2d');
        _this.stops = [];
        return _this;
    }
    GradientManager.prototype.set = function (name, a) {
        var _a, _b, _c;
        var options = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            options[_i - 2] = arguments[_i];
        }
        if (__1.GradientType === null || __1.GradientType === void 0 ? void 0 : __1.GradientType[a])
            this.map.set(name, a === __1.GradientType.radial
                ? (_a = this.ctx).createRadialGradient.apply(_a, options) : a === __1.GradientType.conic
                ? (_b = this.ctx).createConicGradient.apply(_b, options) : (_c = this.ctx).createLinearGradient.apply(_c, options));
        else
            this.map.set(name, a);
    };
    return GradientManager;
}(Manager));
exports.GradientManager = GradientManager;
var ImageManager = /** @class */ (function (_super) {
    __extends(ImageManager, _super);
    function ImageManager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ImageManager.prototype.set = function (name, image) { this.map.set(name, image); };
    return ImageManager;
}(Manager));
exports.ImageManager = ImageManager;
var GIFManager = /** @class */ (function () {
    function GIFManager() {
        this.encoders = new Map();
        this.decoders = new Map();
        this.decodeOptions = new Map();
        this.frames = new Map();
        this.currentOptions = null;
        this.currentEncoder = [];
    }
    Object.defineProperty(GIFManager.prototype, "lastCurrentEncoder", {
        get: function () {
            return this.currentEncoder[this.currentEncoder.length - 1];
        },
        enumerable: false,
        configurable: true
    });
    GIFManager.prototype.setEncoder = function (name, encoder) { this.encoders.set(name, encoder); };
    GIFManager.prototype.setDecoder = function (name, decoder) { this.decoders.set(name, decoder); };
    GIFManager.prototype.setDecodeOptions = function (name, options) { this.decodeOptions.set(name, options); };
    GIFManager.prototype.setFrame = function (name, frame) { this.frames.set(name, frame); };
    GIFManager.prototype.getEncoder = function (name) { return this.encoders.get(name); };
    GIFManager.prototype.getDecoder = function (name) { return this.decoders.get(name); };
    GIFManager.prototype.getDecodeOptions = function (name) { return this.decodeOptions.get(name); };
    GIFManager.prototype.getFrame = function (name) { return this.frames.get(name); };
    GIFManager.prototype.removeEncoder = function (name) { this.encoders.delete(name); };
    GIFManager.prototype.removeDecoder = function (name) { this.decoders.delete(name); };
    GIFManager.prototype.removeDecodeOptions = function (name) { this.decodeOptions.delete(name); };
    GIFManager.prototype.removeFrame = function (name) { this.frames.delete(name); };
    return GIFManager;
}());
exports.GIFManager = GIFManager;
var NeuQuantManager = /** @class */ (function (_super) {
    __extends(NeuQuantManager, _super);
    function NeuQuantManager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NeuQuantManager.prototype.set = function (name, nq) { this.map.set(name, nq); };
    return NeuQuantManager;
}(Manager));
exports.NeuQuantManager = NeuQuantManager;

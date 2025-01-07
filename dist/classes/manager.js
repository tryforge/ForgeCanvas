"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GIFManager = exports.ImageManager = exports.GradientManager = exports.CanvasManager = void 0;
const canvas_1 = require("@napi-rs/canvas");
const builder_1 = require("./builder");
const __1 = require("../");
class Manager {
    map;
    constructor() {
        this.map = new Map();
    }
    ;
    get(name) { return this.map.get(name); }
    ;
    remove(name) { this.map.delete(name); }
    ;
}
;
class CanvasManager extends Manager {
    current;
    constructor() {
        super();
        this.current = [];
    }
    ;
    set(name, a, b) {
        if (typeof a === 'number')
            this.map.set(name, new builder_1.CanvasBuilder(a, b ?? a));
        else
            this.map.set(name, a);
    }
    ;
}
exports.CanvasManager = CanvasManager;
;
class GradientManager extends Manager {
    ctx;
    stops;
    constructor() {
        super();
        this.ctx = (0, canvas_1.createCanvas)(1, 1).getContext('2d');
        this.stops = [];
    }
    ;
    set(name, a, ...options) {
        if (__1.GradientType?.[a])
            this.map.set(name, a === __1.GradientType.radial
                ? this.ctx.createRadialGradient(...options)
                : a === __1.GradientType.conic
                    ? this.ctx.createConicGradient(...options)
                    : this.ctx.createLinearGradient(...options));
        else
            this.map.set(name, a);
    }
    ;
}
exports.GradientManager = GradientManager;
;
class ImageManager extends Manager {
    set(name, image) { this.map.set(name, image); }
    ;
}
exports.ImageManager = ImageManager;
;
class GIFManager {
    encoders;
    decoders;
    decodeOptions;
    currentOptions;
    currentEncoder;
    constructor() {
        this.encoders = new Map();
        this.decoders = new Map();
        this.decodeOptions = new Map();
        this.currentOptions = null;
        this.currentEncoder = [];
    }
    ;
    setEncoder(name, encoder) { this.encoders.set(name, encoder); }
    ;
    setDecoder(name, decoder) { this.decoders.set(name, decoder); }
    ;
    setDecodeOptions(name, options) { this.decodeOptions.set(name, options); }
    ;
    getEncoder(name) { return this.encoders.get(name); }
    ;
    getDecoder(name) { return this.decoders.get(name); }
    ;
    getDecodeOptions(name) { return this.decodeOptions.get(name); }
    ;
    removeEncoder(name) { this.encoders.delete(name); }
    ;
    removeDecoder(name) { this.decoders.delete(name); }
    ;
    removeDecodeOptions(name) { this.decodeOptions.delete(name); }
    ;
}
exports.GIFManager = GIFManager;
;
//# sourceMappingURL=manager.js.map
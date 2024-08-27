"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GradientManager = exports.CanvasManager = void 0;
const canvas_1 = require("@napi-rs/canvas");
const builder_1 = require("./builder");
const typings_1 = require("../typings");
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
        if (typeof a !== 'number')
            this.map.set(name, a);
        else
            this.map.set(name, new builder_1.CanvasBuilder(a, b ?? a));
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
        if (typings_1.GradientType?.[a])
            this.map.set(name, a === typings_1.GradientType.radial
                ? this.ctx.createRadialGradient(...options)
                : a === typings_1.GradientType.conic
                    ? this.ctx.createConicGradient(...options)
                    : this.ctx.createLinearGradient(...options));
        else
            this.map.set(name, a);
    }
    ;
}
exports.GradientManager = GradientManager;
;
//# sourceMappingURL=manager.js.map
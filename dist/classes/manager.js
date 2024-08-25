"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasManager = void 0;
const builder_1 = require("./builder");
class CanvasManager {
    map;
    current;
    constructor() {
        this.map = new Map();
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
    get(name) { return this.map.get(name); }
    ;
    remove(name) { this.map.delete(name); }
    ;
}
exports.CanvasManager = CanvasManager;
;
//# sourceMappingURL=manager.js.map
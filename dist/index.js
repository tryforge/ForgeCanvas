"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgeCanvas = void 0;
const forgescript_1 = require("@tryforge/forgescript");
class ForgeCanvas extends forgescript_1.ForgeExtension {
    static canvases;
    name = "ForgeCanvas";
    description = "A fast and reliable canvas extension for Forge";
    version = "0.2.0";
    constructor() {
        super();
    }
    init(client) {
        ForgeCanvas.canvases = {};
        this.load(__dirname + "/functions");
    }
}
exports.ForgeCanvas = ForgeCanvas;
//# sourceMappingURL=index.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const package_json_1 = require("../../../package.json");
exports.default = new forgescript_1.NativeFunction({
    name: '$canvasVersion',
    description: 'Returns the aoi.canvas version.',
    version: '1.2.0',
    brackets: false,
    unwrap: true,
    args: [],
    async execute(ctx) {
        return this.success(package_json_1.version);
    }
});
//# sourceMappingURL=version.js.map
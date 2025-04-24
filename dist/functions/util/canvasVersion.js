"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const package_json_1 = require("../../../package.json");
exports.default = new forgescript_1.NativeFunction({
    name: '$canvasVersion',
    description: 'Returns the forge.canvas version.',
    version: '1.1.0',
    brackets: false,
    unwrap: true,
    args: [],
    execute() { return this.success(package_json_1.version); }
});

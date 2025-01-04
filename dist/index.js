"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgeCanvas = exports.registerFonts = void 0;
const canvas_1 = require("@napi-rs/canvas");
const forgescript_1 = require("@tryforge/forgescript");
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
const classes_1 = require("./classes");
const package_json_1 = require("../package.json");
const registerFonts = async (fonts) => fonts.forEach(font => {
    if (!(0, node_fs_1.existsSync)(font.src))
        throw classes_1.Logger.log('ERROR', `Invalid font source. (${font.src})`);
    if ((0, node_fs_1.statSync)(font.src).isFile()) {
        let filename = (0, node_path_1.basename)(font.src);
        if (!['ttf', 'otf', 'woff', 'woff2'].find(x => filename.endsWith(`.${x}`)))
            return;
        filename = font.name ?? filename.split('.').slice(0, -1).join('.');
        if (canvas_1.GlobalFonts.has(filename))
            classes_1.Logger.log('WARN', `Font with name '${filename}' already exists.`);
        canvas_1.GlobalFonts.registerFromPath(font.src, filename);
        classes_1.Logger.log('INFO', `Successfully registered '${filename}'.`);
    }
    else
        return (0, exports.registerFonts)((0, node_fs_1.readdirSync)(font.src).map(x => ({ src: (0, node_path_1.join)(font.src, x) })));
});
exports.registerFonts = registerFonts;
class ForgeCanvas extends forgescript_1.ForgeExtension {
    name = 'ForgeCanvas';
    description = 'A ForgeScript extension that allows you to create and edit images with ease.';
    version = package_json_1.version;
    init() {
        this.load(__dirname + '/functions');
    }
    ;
}
exports.ForgeCanvas = ForgeCanvas;
;
__exportStar(require("./classes"), exports);
__exportStar(require("./typings"), exports);
//# sourceMappingURL=index.js.map
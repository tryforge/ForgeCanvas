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
exports.ForgeCanvas = exports.SupportedFonts = void 0;
exports.registerFonts = registerFonts;
const forgescript_1 = require("@tryforge/forgescript");
const canvas_1 = require("@napi-rs/canvas");
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
const undici_1 = require("undici");
const package_json_1 = require("../package.json");
const classes_1 = require("./classes");
exports.SupportedFonts = ['ttf', 'otf', 'woff', 'woff2'];
async function registerFonts(fonts, log) {
    for (const font of fonts) {
        if (!(0, node_fs_1.existsSync)(font.src)) {
            if (log)
                throw new Error(`Invalid font source: ${font.src}`);
            return;
        }
        if ((0, node_fs_1.statSync)(font.src).isFile()) {
            let filename = (0, node_path_1.basename)(font.src);
            if (!exports.SupportedFonts.find(x => filename.endsWith(`.${x}`)))
                return;
            filename = font.name ?? filename.slice(0, filename.lastIndexOf('.'));
            if (log && canvas_1.GlobalFonts.has(filename))
                forgescript_1.Logger.warn(`Font with name '${filename}' already exists`);
            if (!filename?.length)
                throw new Error(`Font name cannot be empty: ${font.src}`);
            if (filename.includes(','))
                throw new Error(`Font name cannot contain commas: ${filename}`);
            if (!canvas_1.GlobalFonts.register((0, node_fs_1.readFileSync)(font.src), filename) && log)
                return forgescript_1.Logger.warn(`Failed to register font: ${filename} (${font.src})`);
            forgescript_1.Logger.info(`Registered a font: ${filename} (${font.src})`);
        }
        else
            registerFonts((0, node_fs_1.readdirSync)(font.src).map(x => ({ src: (0, node_path_1.join)(font.src, x) })), log);
    }
}
class ForgeCanvas extends forgescript_1.ForgeExtension {
    name = 'forge.canvas';
    description = package_json_1.description;
    version = package_json_1.version;
    init(client) {
        this.load(__dirname + '/functions');
        client.preloadImages = new classes_1.ImageManager();
    }
}
exports.ForgeCanvas = ForgeCanvas;
canvas_1.Image.prototype.getBuffer = async function () {
    let buffer;
    if (this.src instanceof Uint8Array)
        return Buffer.from(this.src);
    if (typeof this.src !== 'string')
        throw new Error('Invalid image source');
    if (this.src.startsWith('data:')) {
        const base64 = this.src.split(',')[1];
        buffer = Buffer.from(base64, 'base64');
    }
    else if (classes_1.httpsRegex.test(this.src))
        buffer = Buffer.from(await (await (0, undici_1.fetch)(this.src)).arrayBuffer());
    else
        buffer = (0, node_fs_1.readFileSync)(this.src);
    return buffer;
};
__exportStar(require("./classes"), exports);
__exportStar(require("./typings"), exports);

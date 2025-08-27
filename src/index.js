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
exports.ForgeCanvas = void 0;
exports.registerFonts = registerFonts;
var forgescript_1 = require("@tryforge/forgescript");
var canvas_1 = require("@napi-rs/canvas");
var node_fs_1 = require("node:fs");
var node_path_1 = require("node:path");
var undici_1 = require("undici");
var package_json_1 = require("../package.json");
function registerFonts(fonts, log) {
    return __awaiter(this, void 0, void 0, function () {
        var _loop_1, _i, fonts_1, font, state_1;
        var _a;
        return __generator(this, function (_b) {
            _loop_1 = function (font) {
                if (!(0, node_fs_1.existsSync)(font.src)) {
                    if (log)
                        throw new Error("Invalid font source: ".concat(font.src));
                    return { value: void 0 };
                }
                if ((0, node_fs_1.statSync)(font.src).isFile()) {
                    var filename_1 = (0, node_path_1.basename)(font.src);
                    if (!['ttf', 'otf', 'woff', 'woff2'].find(function (x) { return filename_1.endsWith(".".concat(x)); }))
                        return { value: void 0 };
                    filename_1 = (_a = font.name) !== null && _a !== void 0 ? _a : filename_1.slice(0, filename_1.lastIndexOf('.'));
                    if (log && canvas_1.GlobalFonts.has(filename_1))
                        forgescript_1.Logger.warn("Font with name '".concat(filename_1, "' already exists"));
                    if (!(filename_1 === null || filename_1 === void 0 ? void 0 : filename_1.length))
                        throw new Error("Font name cannot be empty: ".concat(font.src));
                    if (filename_1.includes(','))
                        throw new Error("Font name cannot contain commas: ".concat(filename_1));
                    if (!canvas_1.GlobalFonts.register((0, node_fs_1.readFileSync)(font.src), filename_1) && log)
                        return { value: forgescript_1.Logger.warn("Failed to register font: ".concat(filename_1, " (").concat(font.src, ")")) };
                    forgescript_1.Logger.info("Registered a font: ".concat(filename_1, " (").concat(font.src, ")"));
                }
                else
                    return { value: registerFonts((0, node_fs_1.readdirSync)(font.src).map(function (x) { return ({ src: (0, node_path_1.join)(font.src, x) }); }), log) };
            };
            for (_i = 0, fonts_1 = fonts; _i < fonts_1.length; _i++) {
                font = fonts_1[_i];
                state_1 = _loop_1(font);
                if (typeof state_1 === "object")
                    return [2 /*return*/, state_1.value];
            }
            return [2 /*return*/];
        });
    });
}
var ForgeCanvas = /** @class */ (function (_super) {
    __extends(ForgeCanvas, _super);
    function ForgeCanvas() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = 'forge.canvas';
        _this.description = package_json_1.description;
        _this.version = package_json_1.version;
        return _this;
    }
    ForgeCanvas.prototype.init = function () {
        this.load(__dirname + '/functions');
    };
    return ForgeCanvas;
}(forgescript_1.ForgeExtension));
exports.ForgeCanvas = ForgeCanvas;
canvas_1.Image.prototype.getBuffer = function () {
    return __awaiter(this, void 0, void 0, function () {
        var buffer, base64, response, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (this.src instanceof Uint8Array)
                        return [2 /*return*/, Buffer.from(this.src)];
                    if (!(typeof this.src === 'string')) return [3 /*break*/, 6];
                    if (!this.src.startsWith('data:')) return [3 /*break*/, 1];
                    base64 = this.src.split(',')[1];
                    buffer = Buffer.from(base64, 'base64');
                    return [3 /*break*/, 5];
                case 1:
                    if (!/https?:\/\//.test(this.src)) return [3 /*break*/, 4];
                    return [4 /*yield*/, (0, undici_1.fetch)(this.src)];
                case 2:
                    response = _c.sent();
                    if (!response.ok)
                        throw new Error("Failed to fetch image from ".concat(this.src));
                    _b = (_a = Buffer).from;
                    return [4 /*yield*/, response.arrayBuffer()];
                case 3:
                    buffer = _b.apply(_a, [_c.sent()]);
                    return [3 /*break*/, 5];
                case 4:
                    buffer = (0, node_fs_1.readFileSync)(this.src);
                    _c.label = 5;
                case 5: return [3 /*break*/, 7];
                case 6: throw new Error('Invalid image source');
                case 7: return [2 /*return*/, buffer];
            }
        });
    });
};
__exportStar(require("./classes"), exports);
__exportStar(require("./typings"), exports);

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = exports.CanvasUtil = exports.Colors = exports.hexRegex = exports.rgbaRegex = exports.fontRegex = void 0;
const canvas_1 = require("@napi-rs/canvas");
const chalk_1 = __importDefault(require("chalk"));
exports.fontRegex = /^\s*(?=(?:(?:[-a-z]+\s*){0,2}(italic|oblique))?)(?=(?:(?:[-a-z]+\s*){0,2}(small-caps))?)(?=(?:(?:[-a-z]+\s*){0,2}(bold(?:er)?|lighter|[1-9]00))?)(?:(?:normal|\1|\2|\3)\s*){0,3}((?:xx?-)?(?:small|large)|medium|smaller|larger|[.\d]+(?:\%|in|[cem]m|ex|p[ctx]))(?:\s*\/\s*(normal|[.\d]+(?:\%|in|[cem]m|ex|p[ctx])))?\s*([-,\'\sa-z]+?)\s*$/i;
exports.rgbaRegex = /^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})(\s*,\s*(0|1|0?\.\d+))?\s*\)$/;
exports.hexRegex = /^#?([0-9A-Fa-f]{3,4}){1,2}$/;
exports.Colors = {
    White: '#ffffff',
    Aqua: '#1abc9c',
    Green: '#57f287',
    Blue: '#3498db',
    Yellow: '#fee75c',
    Purple: '#9b59b6',
    LuminousVividPink: '#e91e63',
    Fuchsia: '#eb459e',
    Gold: '#f1c40f',
    Orange: '#e67e22',
    Red: '#ed4245',
    RubberDuck: '#FFD700',
    Grey: '#95a5a6',
    Navy: '#34495e',
    DarkAqua: '#11806a',
    DarkGreen: '#1f8b4c',
    DarkBlue: '#206694',
    DarkPurple: '#71368a',
    DarkVividPink: '#ad1457',
    DarkGold: '#c27c0e',
    DarkOrange: '#a84300',
    DarkRed: '#992d22',
    DarkGrey: '#979c9f',
    DarkerGrey: '#7f8c8d',
    LightGrey: '#bcc0c0',
    DarkNavy: '#2c3e50',
    Blurple: '#5865f2',
    Greyple: '#99aab5',
    DarkButNotBlack: '#2c2f33',
    NotQuiteBlack: '#23272a'
};
class CanvasUtil {
    static isValidFont = (font) => {
        if (!font)
            return false;
        if (exports.fontRegex.test(font)) {
            const res = exports.fontRegex.exec(font);
            if (res && res[0]) {
                const families = res[6].split(',').map(x => x?.trim());
                if (families) {
                    for (const family of families) {
                        if (!canvas_1.GlobalFonts.has(family.replace(/['',]/g, '')))
                            return false;
                    }
                    ;
                }
                ;
                return true;
            }
            ;
            return false;
        }
        ;
        return false;
    };
    static parseFilters = (filters) => {
        const result = [];
        const regex = /(\w+)\(([^)]+)\)/g;
        let match;
        while ((match = regex.exec(filters)) !== null) {
            const [raw, filter, value] = match;
            result.push({ filter, value, raw });
        }
        return result;
    };
    static rgbaToHex = (r, g, b, a) => '#' + r.toString(16).padStart(2, '0') + g.toString(16).padStart(2, '0') + b.toString(16).padStart(2, '0') + (a && a !== undefined ? Math.round(a * 255).toString(16).padStart(2, '0') : '');
    static hexToRgba = (hex) => ({
        red: parseInt(hex.slice(1, 3), 16),
        green: parseInt(hex.slice(3, 5), 16),
        blue: parseInt(hex.slice(5, 7), 16),
        alpha: hex.length === 9 ? parseInt(hex.slice(7, 9), 16) : undefined
    });
}
exports.CanvasUtil = CanvasUtil;
;
exports.Logger = {
    DateColor: chalk_1.default.green.bold,
    Colors: {
        INFO: chalk_1.default.cyan.bold,
        WARN: chalk_1.default.yellow.bold,
        ERROR: chalk_1.default.red.bold,
        MESSAGE: chalk_1.default.cyan.bold
    },
    log(type, message) {
        console.log(this.DateColor(`[${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}]`), this.Colors[type](`[${type}]`), this.Colors.MESSAGE(message));
    }
};
//# sourceMappingURL=util.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasUtil = exports.Colors = exports.hexRegex = exports.rgbaRegex = exports.fontRegex = void 0;
exports.loadFrame = loadFrame;
exports.parseArgs = parseArgs;
const canvas_1 = require("@napi-rs/canvas");
const gifsx_1 = require("@gifsx/gifsx");
const __1 = require("..");
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
exports.CanvasUtil = {
    isValidFont: (font) => {
        if (!font)
            return false;
        if (!exports.fontRegex.test(font))
            return false;
        const res = exports.fontRegex.exec(font);
        if (!res?.[0])
            return false;
        const families = res[6].split(',').map(x => x?.trim());
        for (const family of families) {
            if (!canvas_1.GlobalFonts.has(family.replace(/['',]/g, '')))
                return false;
        }
        return true;
    },
    parseStyle: async (self, ctx, canvas, style) => {
        if (!style)
            return '#000000';
        let s = style.split('://');
        if (s[0] === 'gradient') {
            const gradient = ctx.gradientManager?.get(s.slice(1).join('://'));
            if (!gradient)
                return self.customError('No gradient');
            s = gradient;
        }
        else if (s[0] === 'pattern') {
            const splits = s.slice(1).join('://').split(':'), type = splits.shift()?.toLowerCase(), repeat = splits.length > 0 && ['repeat', 'repeat-x', 'repeat-y', 'no-repeat'].includes(splits[splits.length - 1]) ? splits.pop() : null;
            let image;
            if (type === 'canvas') {
                const canvas_2 = ctx.canvasManager?.get(repeat ? splits.join(':') : splits.join())?.ctx;
                if (!canvas_2)
                    return self.customError('No canvas with provided name found.');
                image = canvas_2.getImageData(0, 0, canvas_2.canvas.width, canvas_2.canvas.height);
            }
            else {
                if (splits?.join(':')?.startsWith('images://')) {
                    const img = ctx?.imageManager?.get(splits.join(':').slice(9));
                    if (!img)
                        return self.customError('No image with provided name found.');
                    image = img;
                }
                else
                    image = await (0, canvas_1.loadImage)(repeat ? splits.join(':') : splits.join());
            }
            s = canvas.ctx.createPattern(image, repeat);
        }
        else {
            s = (exports.hexRegex.test(style) ? style
                : (exports.rgbaRegex.test(style) ? (() => {
                    const match = style.match(exports.rgbaRegex);
                    return (0, gifsx_1.rgbaToHex)(Uint8Array.from([
                        Number.parseInt(match[1], 10),
                        Number.parseInt(match[2], 10),
                        Number.parseInt(match[3], 10),
                        match[5] ? Number.parseFloat(match[5]) : 255
                    ]), false, true);
                })() : exports.Colors[style])) ?? '#000000';
        }
        return s;
    },
    calculateRectAlignOrBaseline: (XorY, WorH, AorB) => {
        AorB = typeof AorB === 'string' ? __1.RectAlign[AorB] : AorB;
        return AorB === __1.RectAlign.center
            ? XorY - WorH / 2
            : AorB === __1.RectAlign.right || AorB === __1.RectBaseline.top
                ? XorY - WorH
                : XorY;
    },
    parseFilters: (filters) => {
        const result = [];
        const regex = /([a-zA-Z-]+)\(([^)]+)\)/g;
        let match;
        while ((match = regex.exec(filters)) !== null) {
            const [raw, filter, value] = match;
            result.push({ filter, value, raw });
        }
        return result;
    }
};
async function loadFrame(src, speed) {
    const img = await (0, canvas_1.loadImage)(src);
    const canvas = (0, canvas_1.createCanvas)(img.width, img.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    return gifsx_1.Frame.fromRgba(canvas.width, canvas.height, Uint8Array.from(ctx.getImageData(0, 0, canvas.width, canvas.height).data), speed);
}
function parseArgs(str, prefix, length, rest) {
    const args = str.slice(typeof prefix === 'string' ? prefix.length : prefix).split(':');
    if (!rest ? args.length !== length : args.length < length)
        throw new Error(`${prefix} expects ${length} arguments.`);
    return args;
}

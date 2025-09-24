"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FCError = exports.CanvasUtil = exports.Colors = exports.hexRegex = exports.rgbaRegex = exports.filterRegex = exports.fontRegex = void 0;
exports.loadFrame = loadFrame;
exports.parseArgs = parseArgs;
const canvas_1 = require("@napi-rs/canvas");
const gifsx_1 = require("@gifsx/gifsx");
const __1 = require("..");
exports.fontRegex = /^\s*(?=(?:(?:[-a-z]+\s*){0,2}(italic|oblique))?)(?=(?:(?:[-a-z]+\s*){0,2}(small-caps))?)(?=(?:(?:[-a-z]+\s*){0,2}(bold(?:er)?|lighter|[1-9]00))?)(?:(?:normal|\1|\2|\3)\s*){0,3}((?:xx?-)?(?:small|large)|medium|smaller|larger|[.\d]+(?:\%|in|[cem]m|ex|p[ctx]))(?:\s*\/\s*(normal|[.\d]+(?:\%|in|[cem]m|ex|p[ctx])))?\s*([-,\'\sa-z_.0-9]+?)\s*$/i;
exports.filterRegex = /([a-zA-Z-]+)\(([^)]+)\)/g;
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
        if (!font || !exports.fontRegex.test(font))
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
    resolveStyle: async (self, ctx, canvas, style) => {
        if (!style)
            return '#000000';
        const s = style.split('://');
        if (s[0] === 'gradient') {
            const gradient = ctx.gradientManager?.get(s.slice(1).join('://'));
            if (!gradient)
                return self.customError(FCError.NoGradient);
            return gradient;
        }
        if (s[0] === 'pattern') {
            const splits = s.slice(1).join('://').split(':'), type = splits.shift()?.toLowerCase(), repeat = splits.length > 0 && [
                'repeat', 'repeat-x',
                'repeat-y', 'no-repeat'
            ].includes(splits[splits.length - 1])
                ? splits.pop() : null;
            let image;
            if (type === 'canvas') {
                const canvas_2 = ctx.canvasManager?.get(repeat ? splits.join(':') : splits.join());
                if (!canvas_2)
                    return self.customError(FCError.NoCanvas);
                image = canvas_2.ctx.canvas;
            }
            else if (type === 'images' && splits[0]?.startsWith('//')) {
                const img = ctx?.imageManager?.get(splits.join(':').slice(2));
                if (!img)
                    return self.customError(FCError.NoImage);
                image = img;
            }
            else
                image = await (0, canvas_1.loadImage)(repeat ? splits.join(':') : `${type}:${splits.join(':')}`);
            return canvas.ctx.createPattern(image, repeat);
        }
        return (exports.hexRegex.test(style) ? style :
            exports.rgbaRegex.test(style) ? exports.CanvasUtil.rgbaStringToHex(style) :
                exports.Colors[style]) ?? '#000000';
    },
    resolveImage: async (self, ctx, src) => {
        const splitted = src.split('//');
        const protocol = splitted[0].slice(0, -1);
        let img = src;
        if (['rgba', 'rgb', 'hex'].includes(protocol)) {
            const [size, data] = parseArgs(src, splitted[0].length + 2, 2);
            const [width, height] = size.split('x').map(Number);
            const canvas = (0, canvas_1.createCanvas)(width, height);
            const context = canvas.getContext('2d');
            const imageData = context.createImageData(width, height);
            imageData.data.set(new Uint8ClampedArray(protocol === 'hex'
                ? (0, gifsx_1.hexToRgba)(data.split(',').map(x => x.trim()))
                : protocol === 'rgb'
                    ? data.split(',').map(Number).flatMap((v, i) => {
                        if ((i + 1) % 3 === 0)
                            return [v, 255];
                        return [v];
                    })
                    : data.split(',').map(Number)));
            context.putImageData(imageData, 0, 0);
            img = canvas.toBuffer('image/png');
        }
        else if (protocol === 'frame') {
            const frame = ctx.gifManager?.getFrame(src.slice(8));
            if (!frame)
                return self.customError(FCError.NoFrame);
            const { width, height, buffer } = frame;
            const canvas = (0, canvas_1.createCanvas)(width, height);
            const context = canvas.getContext('2d');
            const imageData = context.createImageData(width, height);
            imageData.data.set(buffer.length === width * height * 4
                ? buffer : (0, gifsx_1.indexedToRgba)(Uint8Array.from(buffer), frame.palette ?? Uint8Array.from([]), frame.transparent));
            context.putImageData(imageData, 0, 0);
            img = canvas.toBuffer('image/png');
        }
        else if (protocol === 'images') {
            const image = ctx.imageManager?.get(splitted.slice(1).join('//'));
            if (!image)
                return self.customError(FCError.NoImage);
            img = image;
        }
        else if (protocol === 'canvas') {
            const canvas = ctx.canvasManager?.get(splitted.slice(1).join('//'));
            if (!canvas)
                return self.customError(FCError.NoCanvas);
            img = canvas.buffer('image/png');
        }
        else if (src?.includes('<svg'))
            img = `data:image/svg+xml;base64,${Buffer.from(src)?.toString('base64')}`;
        return await (0, canvas_1.loadImage)(img)
            .catch((e) => self.customError(e.toString()));
    },
    rgbaStringToHex: (rgba) => {
        const match = rgba.match(exports.rgbaRegex);
        return (0, gifsx_1.rgbaToHex)(Uint8Array.from([
            Number.parseInt(match[1], 10),
            Number.parseInt(match[2], 10),
            Number.parseInt(match[3], 10),
            match[5] ? Number.parseFloat(match[5]) : 255
        ]), false, true)[0];
    },
    resolveFrame: async (self, ctx, frame, speed) => {
        switch (frame.substring(0, frame.indexOf(':'))) {
            case 'rgba': {
                const [size, data] = parseArgs(frame, 'rgba://', 2);
                const [width, height] = size.split('x').map(Number);
                return gifsx_1.Frame.fromRgba(width, height, Uint8Array.from(data.split(',').map(Number)), speed);
            }
            case 'hex': {
                const [size, data] = parseArgs(frame, 'hex://', 2);
                const [width, height] = size.split('x').map(Number);
                return gifsx_1.Frame.fromHex(width, height, data.split(',').map(x => x.trim()), speed);
            }
            case 'rgb': {
                const [size, data] = parseArgs(frame, 'rgb://', 2);
                const [width, height] = size.split('x').map(Number);
                return gifsx_1.Frame.fromRgb(width, height, Uint8Array.from(data.split(',').map(Number)), speed);
            }
            case 'indexed': {
                const [size, data] = parseArgs(frame, 'indexed://', 2);
                const [width, height] = size.split('x').map(Number);
                return gifsx_1.Frame.fromIndexedPixels(width, height, Uint8Array.from(data.split(',').map(Number)));
            }
            case 'images': {
                const img = ctx.imageManager?.get(frame.slice(9));
                if (!img)
                    return self.customError(FCError.NoImage);
                return await loadFrame(img, speed);
            }
            case 'canvas': {
                const canvas = ctx.canvasManager?.get(frame.slice(9));
                if (!canvas)
                    return self.customError(FCError.NoCanvas);
                return gifsx_1.Frame.fromRgba(canvas.width, canvas.height, Uint8Array.from(canvas.ctx.getImageData(0, 0, canvas.width, canvas.height).data), speed);
            }
            default: return await loadFrame(frame, speed);
        }
    },
    calculateRectAlignOrBaseline: (XorY, WorH, AorB) => {
        AorB = typeof AorB === 'string'
            ? __1.RectAlign[AorB]
            : AorB;
        return AorB === __1.RectAlign.center
            ? XorY - WorH / 2
            : AorB === __1.RectAlign.right || AorB === __1.RectBaseline.top
                ? XorY - WorH
                : XorY;
    },
    parseFilters: (filters) => {
        const result = [];
        let match;
        while ((match = exports.filterRegex.exec(filters)) !== null) {
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
        throw new Error(`${prefix} expects ${length} arguments`);
    return args;
}
var FCError;
(function (FCError) {
    FCError["NoCanvas"] = "No canvas with provided name found";
    FCError["NoImage"] = "No image with provided name found";
    FCError["NoGradient"] = "No gradient with provided name found";
    FCError["NoStyle"] = "No style provided";
    FCError["NoFilter"] = "No filter provided";
    FCError["NoFilterOrValue"] = "No filter or value provided";
    FCError["ImageFail"] = "Failed to load an image";
    FCError["InvalidOffset"] = "Offset must be between 0 and 100";
    FCError["InvalidRectType"] = "Invalid rect type provided (Expected fill/stroke/clear)";
    FCError["InvalidLineDashSegments"] = "Invalid line dash segments provided (Expected array of numbers)";
    FCError["NoEncoder"] = "No GIF encoder with provided name found";
    FCError["NoDecoder"] = "No GIF decoder with provided name found";
    FCError["NoDecodeOptions"] = "No decode options with provided name found";
    FCError["NoNeuQuant"] = "No NeuQuant Instance with provided name found";
    FCError["NoFrame"] = "No frame with provided name found";
    FCError["NoSizeAndPalette"] = "No size and palette has been set";
    FCError["FrameFail"] = "Failed to load a frame";
    FCError["NoBarData"] = "No bar data provided";
    FCError["InvalidBarData"] = "Invalid bar data provided";
    FCError["InvalidBarType"] = "Invalid bar type provided (Expected normal/pie)";
    FCError["InvalidBarDirection"] = "Invalid bar direction provided (Expected horizontal/vertical)";
    FCError["NoSize"] = "No size has been set";
    FCError["NoPath"] = "No path provided";
    FCError["ArrayExpected"] = "Array expected";
    FCError["InvalidWidthOrHeight"] = "Invalid width or height provided";
})(FCError || (exports.FCError = FCError = {}));

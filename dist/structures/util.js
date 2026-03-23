"use strict";
/*
* SPDX-License-Identifier: LGPL-3.0-or-later
* Copyright © 2026 BotForge
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.Colors = exports.SUPPORTED_FONT_FORMATS = exports.hexRegex = exports.rgbaRegex = exports.filterRegex = exports.fontRegex = exports.httpsRegex = exports.wordRegex = exports.cacheRegex = exports.emojiRegex = exports.fontcssRegex = exports.urlRegex = void 0;
exports.registerFonts = registerFonts;
exports.validateFont = validateFont;
exports.parseFilters = parseFilters;
exports.resolveStyle = resolveStyle;
exports.resolveImage = resolveImage;
exports.rgbaStringToHex = rgbaStringToHex;
exports.resolveFrame = resolveFrame;
exports.parseText = parseText;
exports.loadFrame = loadFrame;
exports.parseArgs = parseArgs;
const forgescript_1 = require("@tryforge/forgescript");
const canvas_1 = require("@napi-rs/canvas");
const gifsx_1 = require("@gifsx/gifsx");
const undici_1 = require("undici");
const node_path_1 = require("node:path");
const node_fs_1 = require("node:fs");
const __1 = require("..");
exports.urlRegex = /^url\(['"]?|['"]?\)$/g;
exports.fontcssRegex = /\/\*\s*(?<subset>[\w-]+)\s*\*\/[\s\S]*?font-family:\s*['"]?(?<family>[^'";]+)['"]?;[\s\S]*?url\((?<url>[^)]+)\)/g;
exports.emojiRegex = /<(a?):(\w+):(\d+)>/y;
exports.cacheRegex = /^cache_.*/;
exports.wordRegex = /\S+\s*|\s+/g;
exports.httpsRegex = /https?:\/\//;
exports.fontRegex = /^\s*(?=(?:(?:[-a-z]+\s*){0,2}(italic|oblique))?)(?=(?:(?:[-a-z]+\s*){0,2}(small-caps))?)(?=(?:(?:[-a-z]+\s*){0,2}(bold(?:er)?|lighter|[1-9]00))?)(?:(?:normal|\1|\2|\3)\s*){0,3}((?:xx?-)?(?:small|large)|medium|smaller|larger|[.\d]+(?:\%|in|[cem]m|ex|p[ctx]))(?:\s*\/\s*(normal|[.\d]+(?:\%|in|[cem]m|ex|p[ctx])))?\s*([-,\'\sa-z_.0-9]+?)\s*$/i;
exports.filterRegex = /([a-zA-Z-]+)\(([^)]+)\)/g;
exports.rgbaRegex = /^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})(\s*,\s*(0|1|0?\.\d+))?\s*\)$/;
exports.hexRegex = /^#?([0-9A-Fa-f]{3,4}){1,2}$/;
exports.SUPPORTED_FONT_FORMATS = ['ttf', 'otf', 'woff', 'woff2'];
async function registerFonts(fonts, log) {
    for (const font of fonts) {
        if (font.src.startsWith('url(') || font.src.startsWith('http')) {
            font.src = font.src.replace(exports.urlRegex, '').trim();
            if (exports.httpsRegex.test(font.src)) {
                const { statusCode, headers, body } = await (0, undici_1.request)(font.src, {
                    headers: { 'User-Agent': 'Mozilla/5.0 () Gecko/20100101 Firefox/147.0' }
                });
                if (statusCode >= 400)
                    throw forgescript_1.Logger.error(`Failed to fetch font: ${font.src} (${statusCode})`);
                if (headers['content-type']?.startsWith('text/')) {
                    const families = [...(await body.text()).matchAll(exports.fontcssRegex)].map(match => {
                        // @ts-expect-error
                        const { url, subset, family = font.name } = match.groups;
                        return { src: url, name: subset?.length ? `${family}-${subset.trim()}` : family };
                    });
                    if (!families.length)
                        throw forgescript_1.Logger.error(`Invalid font CSS: ${font.name ?? font.src}`);
                    await registerFonts(families, log);
                }
                else if (!canvas_1.GlobalFonts.register(Buffer.from(await body.arrayBuffer()), font.name ?? undefined) && log) {
                    forgescript_1.Logger.warn(`Failed to register font: '${font.name ?? font.src}'`);
                }
                else if (log)
                    forgescript_1.Logger.info(`Registered a font: ${font.name ?? font.src}`);
                continue;
            }
        }
        if (!(0, node_fs_1.existsSync)(font.src)) {
            if (log)
                throw new Error(`Invalid font source: ${font.src}`);
            return;
        }
        if ((0, node_fs_1.statSync)(font.src).isFile()) {
            let filename = (0, node_path_1.basename)(font.src);
            if (!exports.SUPPORTED_FONT_FORMATS.includes(filename.split('.').pop()))
                return;
            filename = font.name ?? filename.slice(0, filename.lastIndexOf('.'));
            if (log && canvas_1.GlobalFonts.has(filename))
                forgescript_1.Logger.warn(`Font with name '${filename}' already exists`);
            if (!filename?.length)
                throw new Error(`Font name cannot be empty: ${font.src}`);
            if (filename.includes(','))
                throw new Error(`Font name cannot contain commas: ${filename}`);
            if (!canvas_1.GlobalFonts.register((0, node_fs_1.readFileSync)(font.src), filename) && log) {
                forgescript_1.Logger.warn(`Failed to register font: ${filename} (${font.src})`);
                continue;
            }
            if (log)
                forgescript_1.Logger.info(`Registered a font: ${filename} (${font.src})`);
        }
        else
            registerFonts((0, node_fs_1.readdirSync)(font.src).map(x => ({ src: (0, node_path_1.join)(font.src, x) })), log);
    }
}
function validateFont(font) {
    const match = exports.fontRegex.exec(font);
    if (!match?.[0])
        return __1.ForgeCanvasError.InvalidFontFormat;
    const families = match[6].split(',').map(x => x?.trim());
    for (const family of families)
        if (!canvas_1.GlobalFonts.has(family.replace(/['',]/g, '')))
            return `${__1.ForgeCanvasError.InvalidFont} (${family})`;
    return match;
}
function parseFilters(str) {
    const result = new Array(1);
    let match;
    while ((match = exports.filterRegex.exec(str)) !== null) {
        const [raw, filter, value] = match;
        result.push({ filter, value, raw });
    }
    return result;
}
async function resolveStyle(self, ctx, canvas, style) {
    if (!style)
        return '#0';
    const s = style.split('://');
    const args = style.slice(style.indexOf('://') + 3);
    if (s[0] === 'gradient') {
        const gradient = ctx.gradientManager?.get(args);
        if (!gradient)
            return self.customError(__1.ForgeCanvasError.NoGradient);
        return gradient;
    }
    if (s[0] === 'pattern') {
        const splits = args.split(':'), type = splits.shift()?.toLowerCase();
        let x, y;
        if (splits.length > 2) {
            const l = splits.length;
            const xa = parseFloat(splits[l - 2]);
            const ya = parseFloat(splits[l - 1]);
            if (!Number.isNaN(xa) && !Number.isNaN(ya)) {
                x = xa;
                y = ya;
                splits.pop();
                splits.pop();
            }
        }
        const repeat = splits.length && [
            'repeat', 'repeat-x',
            'repeat-y', 'no-repeat'
        ].includes(splits[splits.length - 1])
            ? splits.pop() : null;
        let image;
        if (type === 'canvas') {
            const canvas_2 = ctx.canvasManager?.get(repeat ? splits.join(':') : splits.join());
            if (!canvas_2)
                return self.customError(__1.ForgeCanvasError.NoCanvas);
            image = canvas_2.ctx.canvas;
        }
        else if (type === 'images' && splits[0]?.startsWith('//')) {
            const source = splits.join(':').slice(2);
            const meow = source.startsWith('preload://');
            const img = (meow ? ctx.client.preloadImages : ctx.imageManager)
                ?.get(meow ? source.slice(10) : source);
            if (!img)
                return self.customError(__1.ForgeCanvasError.NoImage);
            image = img;
        }
        else
            image = await (ctx.imageManager ??= new __1.ImageManager()).load(repeat ? splits.join(':') : `${type}:${splits.join(':')}`);
        const pattern = canvas.ctx.createPattern(image, repeat);
        if (x !== undefined && y !== undefined)
            pattern.setTransform(new DOMMatrix().translate(x, y));
        return pattern;
    }
    return (exports.hexRegex.test(style) ? style :
        exports.rgbaRegex.test(style) ? rgbaStringToHex(style) :
            exports.Colors[style]) ?? '#0';
}
async function resolveImage(self, ctx, src) {
    const splitted = src.split('//');
    const protocol = splitted[0].slice(0, -1);
    let img = src;
    switch (protocol) {
        case 'rgba':
        case 'rgb':
        case 'hex': {
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
            break;
        }
        case 'frame': {
            const frame = ctx.gifManager?.getFrame(src.slice(8));
            if (!frame)
                return self.customError(__1.ForgeCanvasError.NoFrame);
            const { width, height, buffer } = frame;
            const canvas = (0, canvas_1.createCanvas)(width, height);
            const context = canvas.getContext('2d');
            const imageData = context.createImageData(width, height);
            imageData.data.set(buffer.length === width * height * 4
                ? buffer : (0, gifsx_1.indexedToRgba)(Uint8Array.from(buffer), new Uint8Array(frame.palette ?? []), frame.transparent));
            context.putImageData(imageData, 0, 0);
            img = await canvas.encode('png');
            break;
        }
        case 'preload': {
            const image = ctx.client.preloadImages?.get(splitted.slice(1).join('//'));
            if (!image)
                return self.customError(__1.ForgeCanvasError.NoImage);
            img = image;
            break;
        }
        case 'images': {
            const image = ctx.imageManager?.get(splitted.slice(1).join('//'));
            if (!image)
                return self.customError(__1.ForgeCanvasError.NoImage);
            img = image;
            break;
        }
        case 'canvas': {
            const canvas = ctx.canvasManager?.get(splitted.slice(1).join('//'));
            if (!canvas)
                return self.customError(__1.ForgeCanvasError.NoCanvas);
            img = await canvas.encode(__1.ImageFormat.png);
            break;
        }
        default: if (src?.includes('<svg'))
            img = `data:image/svg+xml;base64,${Buffer.from(src)?.toString('base64')}`;
    }
    return await (0, canvas_1.loadImage)(img, ctx.imageManager?.loadOptions)
        .catch((e) => self.customError(e.toString()));
}
function rgbaStringToHex(rgba) {
    const match = rgba.match(exports.rgbaRegex);
    return (0, gifsx_1.rgbaToHex)(Uint8Array.from([
        Number.parseInt(match[1], 10),
        Number.parseInt(match[2], 10),
        Number.parseInt(match[3], 10),
        match[5] ? Number.parseFloat(match[5]) : 255
    ]), false, true)[0];
}
async function resolveFrame(self, ctx, frame, speed) {
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
            const source = frame.slice(9);
            const meow = frame.startsWith('preload://');
            const img = (meow ? ctx.client.preloadImages : ctx.imageManager)
                ?.get(meow ? source.slice(10) : source);
            if (!img)
                return self.customError(__1.ForgeCanvasError.NoImage);
            return await loadFrame((ctx.imageManager ?? (ctx.imageManager = new __1.ImageManager())), img, speed);
        }
        case 'canvas': {
            const canvas = ctx.canvasManager?.get(frame.slice(9));
            if (!canvas)
                return self.customError(__1.ForgeCanvasError.NoCanvas);
            return gifsx_1.Frame.fromRgba(canvas.width, canvas.height, Uint8Array.from(canvas.inner.data()), speed);
        }
        default: return await loadFrame((ctx.imageManager ?? (ctx.imageManager = new __1.ImageManager())), frame, speed);
    }
}
async function parseText(client, text, parseNL, parseEmoji) {
    if (!text?.trim()?.length)
        return [];
    if (!parseNL && !parseEmoji)
        return [text];
    const spans = new Array(0);
    const regex = new RegExp(exports.emojiRegex.source, 'y');
    let cur = '';
    let sI = 0;
    let i = 0;
    while (i < text.length) {
        const c = text[i];
        if (c === '\\') {
            cur += text.slice(sI, i);
            i++;
            sI = i;
            i++;
            continue;
        }
        else if (parseNL && c === '\n') {
            cur += text.slice(sI, i);
            if (cur.length)
                spans.push(cur);
            spans.push(null);
            cur = '';
            i++;
            sI = i;
            continue;
        }
        else if (parseEmoji && c === '<') {
            regex.lastIndex = i;
            const match = regex.exec(text);
            if (match) {
                cur += text.slice(sI, i);
                const id = match[3];
                if (cur.length)
                    spans.push(cur);
                spans.push(client.preloadImages.tryGet(`cache_emoji_${id}`, `https://cdn.discordapp.com/emojis/${id}.png`));
                cur = '';
                i += match[0].length;
                sI = i;
                continue;
            }
        }
        i++;
    }
    cur = text.slice(sI, i);
    if (cur.length)
        spans.push(cur);
    return Promise.all(spans);
}
async function loadFrame(manager, src, speed) {
    const img = manager ? await manager.load(src)
        : await (0, canvas_1.loadImage)(src);
    const canvas = (0, canvas_1.createCanvas)(img.width, img.height);
    canvas.getContext('2d').drawImage(img, 0, 0);
    return gifsx_1.Frame.fromRgba(canvas.width, canvas.height, Uint8Array.from(canvas.data()), speed);
}
function parseArgs(str, prefix, length, rest) {
    const args = str.slice(typeof prefix === 'string' ? prefix.length : prefix).split(':');
    if (!rest ? args.length !== length : args.length < length)
        throw new Error(`${prefix} expects ${length} arguments`);
    return args;
}
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

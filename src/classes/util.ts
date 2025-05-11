import { GlobalFonts, loadImage, Image, createCanvas } from '@napi-rs/canvas';
import { CompiledFunction, Context } from '@tryforge/forgescript';
import { Frame, hexToRgba, indexedToRgba, rgbaToHex } from '@gifsx/gifsx';
import { RectAlign, RectBaseline } from '..';
import { CanvasBuilder } from './builder';

export const fontRegex = /^\s*(?=(?:(?:[-a-z]+\s*){0,2}(italic|oblique))?)(?=(?:(?:[-a-z]+\s*){0,2}(small-caps))?)(?=(?:(?:[-a-z]+\s*){0,2}(bold(?:er)?|lighter|[1-9]00))?)(?:(?:normal|\1|\2|\3)\s*){0,3}((?:xx?-)?(?:small|large)|medium|smaller|larger|[.\d]+(?:\%|in|[cem]m|ex|p[ctx]))(?:\s*\/\s*(normal|[.\d]+(?:\%|in|[cem]m|ex|p[ctx])))?\s*([-,\'\sa-z]+?)\s*$/i
export const rgbaRegex = /^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})(\s*,\s*(0|1|0?\.\d+))?\s*\)$/;
export const hexRegex = /^#?([0-9A-Fa-f]{3,4}){1,2}$/;
export const Colors: Record<string, string> = {
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

export const CanvasUtil = {
    isValidFont: (font: string) => {
        if (!font || !fontRegex.test(font))
            return false;
        
        const res = fontRegex.exec(font)
        if (!res?.[0]) return false;

        const families = res[6].split(',').map(x => x?.trim());
        for (const family of families) {
            if (!GlobalFonts.has(family.replace(/['',]/g, '')))
                return false;
        }
        return true;
    },

    resolveStyle: async (self: CompiledFunction, ctx: Context, canvas: CanvasBuilder, style: string | undefined | null) => {
        if (!style) return '#000000';
        const s = style.split('://');

        if (s[0] === 'gradient') {
            const gradient = ctx.gradientManager?.get(s.slice(1).join('://'));
            if (!gradient) return self.customError(FCError.NoGradient);
            return gradient;
        }

        if (s[0] === 'pattern') {
            const splits = s.slice(1).join('://').split(':'),
                type = splits.shift()?.toLowerCase(),
                repeat = splits.length > 0 && [
                        'repeat', 'repeat-x',
                        'repeat-y', 'no-repeat'
                    ].includes(splits[splits.length - 1])
                        ? splits.pop() : null;
            
            let image: Image | ImageData;
            
            if (type === 'canvas') {
                const canvas_2 = ctx.canvasManager?.get(repeat ? splits.join(':') : splits.join())?.ctx;
                if (!canvas_2) return self.customError(FCError.NoCanvas);
        
                image = canvas_2.getImageData(0, 0, canvas_2.canvas.width, canvas_2.canvas.height);
            } else if (type === 'images' && splits[0]?.startsWith('//')) {
                const img = ctx?.imageManager?.get(splits.join(':').slice(2));
                if (!img) return self.customError(FCError.NoImage);

                image = img;
            } else image = await loadImage(repeat ? splits.join(':') : `${type}:${splits.join(':')}`);

            return canvas.ctx.createPattern(image, repeat as any);
        }

        return (
            hexRegex.test(style) ? style :
            rgbaRegex.test(style) ? CanvasUtil.rgbaStringToHex(style) :
            Colors[style]
        ) ?? '#000000';
    },

    resolveImage: async (self: CompiledFunction, ctx: Context, src: string) => {
        const splitted = src.split('//');
        const protocol = splitted[0].slice(0, -1);

        let img: Buffer | Image | string = src;
        if (['rgba', 'rgb', 'hex'].includes(protocol)) {
            const [size, data] = parseArgs(src, splitted[0].length + 2, 2);
            const [width, height] = size.split('x').map(Number);
            
            const canvas = createCanvas(width, height);
            const context = canvas.getContext('2d');
            const imageData = context.createImageData(width, height);

            imageData.data.set(new Uint8ClampedArray(
                protocol === 'hex'
                    ? hexToRgba(data.split(',').map(x => x.trim()))
                : protocol === 'rgb'
                    ? data.split(',').map(Number).flatMap((v, i) => {
                        if ((i + 1) % 3 === 0)
                            return [v, 255];
                        return [v];
                    })
                : data.split(',').map(Number)
            ));

            context.putImageData(imageData, 0, 0);
            img = canvas.toBuffer('image/png');
        } else if (protocol === 'frame') {
            const frame = ctx.gifManager?.getFrame(src.slice(8));
            if (!frame) return self.customError(FCError.NoFrame);

            const { width, height, buffer } = frame;

            const canvas = createCanvas(width, height);
            const context = canvas.getContext('2d');
            const imageData = context.createImageData(width, height);

            imageData.data.set(
                buffer.length === width * height * 4
                    ? buffer : indexedToRgba(
                        Uint8Array.from(buffer), frame.palette ?? Uint8Array.from([]),
                        frame.transparent
                    )
            );
            context.putImageData(imageData, 0, 0);
            
            img = canvas.toBuffer('image/png');
        } else if (protocol === 'images') {
            const image = ctx.imageManager?.get(splitted.slice(1).join('//'));
            if (!image) return self.customError(FCError.NoImage);
            img = image;
        } else if (protocol === 'canvas') {
            const canvas = ctx.canvasManager?.get(splitted.slice(1).join('//'));
            if (!canvas) return self.customError(FCError.NoCanvas);
            img = canvas.buffer('image/png');
        }

        return await loadImage(img);
    },

    rgbaStringToHex: (rgba: string) => {
        const match = rgba.match(rgbaRegex)!;
        return rgbaToHex(Uint8Array.from([
            Number.parseInt(match[1], 10),
            Number.parseInt(match[2], 10),
            Number.parseInt(match[3], 10),
            match[5] ? Number.parseFloat(match[5]) : 255
        ]), false, true)[0];
    },

    resolveFrame: async (self: CompiledFunction, ctx: Context, frame: string, speed: number | undefined | null) => {
        switch (frame.split('://')[0]) {
            case 'rgba': {
                const [size, data] = parseArgs(frame, 'rgba://', 2);
                const [width, height] = size.split('x').map(Number);
                return Frame.fromRgba(
                    width, height,
                    Uint8Array.from(data.split(',').map(Number)),
                    speed
                );
            }
            
            case 'hex': {
                const [size, data] = parseArgs(frame, 'hex://', 2);
                const [width, height] = size.split('x').map(Number);
                return Frame.fromHex(
                    width, height,
                    data.split(',').map(x => x.trim()),
                    speed
                );
            }
            
            case 'rgb': {
                const [size, data] = parseArgs(frame, 'rgb://', 2);
                const [width, height] = size.split('x').map(Number);
                return Frame.fromRgb(
                    width, height,
                    Uint8Array.from(data.split(',').map(Number)),
                    speed
                );
            }
            
            case 'indexed': {
                const [size, data] = parseArgs(frame, 'indexed://', 2);
                const [width, height] = size.split('x').map(Number);
                return Frame.fromIndexedPixels(
                    width, height,
                    Uint8Array.from(data.split(',').map(Number))
                );
            }
            
            case 'images': {
                const img = ctx.imageManager?.get(frame.slice(9));
                if (!img) return self.customError(FCError.NoImage);
                return await loadFrame(img, speed);
            }

            case 'canvas': {
                const canvas = ctx.canvasManager?.get(frame.slice(9));
                if (!canvas) return self.customError(FCError.NoCanvas);
                return Frame.fromRgba(
                    canvas.width, canvas.height,
                    Uint8Array.from(canvas.ctx.getImageData(
                        0, 0,
                        canvas.width,
                        canvas.height
                    ).data),
                    speed
                );
            }

            default: return await loadFrame(frame, speed);
        }
    },

    calculateRectAlignOrBaseline: (
        XorY: number,
        WorH: number,
        AorB: RectAlign | RectBaseline 
    ) => {
        AorB = typeof AorB === 'string' ? RectAlign[AorB as keyof typeof RectAlign] : AorB;
        return AorB === RectAlign.center
                ? XorY - WorH / 2
            : AorB === RectAlign.right || AorB === RectBaseline.top
                ? XorY - WorH
            : XorY;
    },

    parseFilters: (filters: string) => {
        const result = [];
        const regex = /([a-zA-Z-]+)\(([^)]+)\)/g;

        let match: RegExpExecArray | null;
        while ((match = regex.exec(filters)) !== null) {
            const [raw, filter, value] = match;
            result.push({ filter, value, raw });
        }
      
        return result;
    }
};

export async function loadFrame(
    src: string | URL | Buffer | ArrayBufferLike | Uint8Array | Image | import("stream").Readable,
    speed?: number | null
) {
    const img = await loadImage(src);
    const canvas = createCanvas(img.width, img.height);
    const ctx = canvas.getContext('2d');

    ctx.drawImage(img, 0, 0);
    return Frame.fromRgba(
        canvas.width, canvas.height,
        Uint8Array.from(ctx.getImageData(
            0, 0,
            canvas.width,
            canvas.height
        ).data),
        speed
    );
}

export function parseArgs(str: string, prefix: string | number, length: number, rest?: boolean) {
    const args = str.slice(typeof prefix === 'string' ? prefix.length : prefix).split(':');
    if (!rest ? args.length !== length : args.length < length)
        throw new Error(`${prefix} expects ${length} arguments`);

    return args;
}

export enum FCError {
    NoCanvas = 'No canvas with provided name found',
    NoImage = 'No image with provided name found',
    NoGradient = 'No gradient with provided name found',
    NoStyle = 'No style provided',
    ImageFail = 'Failed to load an image',
    InvalidOffset = 'Offset must be between 0 and 100',
    InvalidRectType = 'Invalid rect type provided (Expected fill/stroke/clear)',
    InvalidLineDashSegments = 'Invalid line dash segments provided (Expected array of numbers)',

    NoEncoder = 'No GIF encoder with provided name found',
    NoDecoder = 'No GIF decoder with provided name found',
    NoDecodeOptions = 'No decode options with provided name found',
    NoNeuQuant = 'No NeuQuant Instance with provided name found',
    NoFrame = 'No frame with provided name found',
    NoSizeAndPalette = 'No size and palette has been set',
    FrameFail = 'Failed to load a frame',

    NoBarData = 'No bar data provided',
    InvalidBarData = 'Invalid bar data provided',
    InvalidBarType = 'Invalid bar type provided (Expected normal/pie)',
    InvalidBarDirection = 'Invalid bar direction provided (Expected horizontal/vertical)',
    
    NoSize = 'No size has been set',
    NoPath = 'No path provided',
    ArrayExpected = 'Array expected',
}
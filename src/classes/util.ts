import { GlobalFonts, loadImage, Image, createCanvas } from '@napi-rs/canvas';
import chalk from 'chalk';
import { Context, RectAlign, RectBaseline } from '..';
import { CanvasBuilder } from './builder';
import { Frame, rgbaToHex } from '@gifsx/gifsx';

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
        if (!font) return false;
        if (fontRegex.test(font)) {
            const res = fontRegex.exec(font)
          
            if (res?.[0]) {
                const families = res[6].split(',').map(x => x?.trim());

                if (families) {
                    for (const family of families) {
                        if (!GlobalFonts.has(family.replace(/['',]/g, '')))
                            return false;
                    };
                };

                return true;
            };
            return false;
        };
        return false;
    },

    parseStyle: async(self: any, ctx: Context, canvas: CanvasBuilder, style: string | undefined | null) => {
        if (!style) return '#000000';
        let s: string[] | string | CanvasGradient | CanvasPattern = style.split('://');

        if (s[0] === 'gradient') {
            const gradient = ctx.gradientManager?.get(s.slice(1).join('://'));
            if (!gradient) return self.customError('No gradient');

            s = gradient;
        } else if (s[0] === 'pattern') {
            const splits = s.slice(1).join('://').split(':'),
                type = splits.shift()?.toLowerCase(),
                repeat = splits.length > 0 && ['repeat', 'repeat-x', 'repeat-y', 'no-repeat'].includes(splits[splits.length - 1]) ? splits.pop() : null;
            let image: Image | ImageData;
            
            if (type === 'canvas') {
                const canvas_2 = ctx.canvasManager?.get(repeat ? splits.join(':') : splits.join())?.ctx;
        
                if (!canvas_2)
                    return self.customError('No canvas with provided name found.');
        
                image = canvas_2.getImageData(0, 0, canvas_2.canvas.width, canvas_2.canvas.height);
            } else if (type === 'image') {
                if (splits?.join(':')?.startsWith('images://')) {
                    const img = ctx?.imageManager?.get(splits.join(':').slice(9));
                    
                    if (!img)
                        return self.customError('No image with provided name found.');

                    image = img;
                } else image = await loadImage(repeat ? splits.join(':') : splits.join());
            } else return self.customError('Invalid pattern type.');

            s = canvas.ctx.createPattern(image, repeat as any);
        } else {
            s = (hexRegex.test(style) ? style 
                : (rgbaRegex.test(style) ? (() => {
                    const match = style.match(rgbaRegex) as RegExpMatchArray;
                    return rgbaToHex(Uint8Array.from([
                        Number.parseInt(match[1], 10),
                        Number.parseInt(match[2], 10),
                        Number.parseInt(match[3], 10),
                        match[5] ? Number.parseFloat(match[5]) : 255
                    ]), false, true);
                })() : Colors[style])) ?? '#000000';
        };

        return s;
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

export const Logger = {
    DateColor: chalk.green.bold,
    Colors: {
        INFO: chalk.cyan.bold,
        WARN: chalk.yellow.bold,
        ERROR: chalk.red.bold,
        MESSAGE: chalk.cyan.bold
    },
    log(type: 'INFO' | 'WARN' | 'ERROR' | 'MESSAGE', message: string) {
        console.log(
            this.DateColor(`[${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}]`),
            this.Colors[type](`[${type}]`),
            this.Colors.MESSAGE(message)
        );
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
};

export function parseArgs(str: string, prefix: string | number, length: number, rest?: boolean) {
    const args = str.slice(typeof prefix === 'string' ? prefix.length : prefix).split(':');
    if (!rest ? args.length !== length : args.length < length)
        throw new Error(`${prefix} frame expects ${length} arguments.`);

    return args;
};
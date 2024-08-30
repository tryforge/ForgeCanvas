import { GlobalFonts } from '@napi-rs/canvas';
import chalk from 'chalk';

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

export class CanvasUtil {
    public static isValidFont = (font: string) => {
        if (!font)
            return false;
      
        if (fontRegex.test(font)) {
            const res = fontRegex.exec(font)
          
            if (res && res[0]) {
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
    };

    public static parseFilters = (filters: string) => {
        const result = [];
      
        const regex = /(\w+)\(([^)]+)\)/g;
        let match;
      
        while ((match = regex.exec(filters)) !== null) {
            const [raw, filter, value] = match;
            result.push({ filter, value, raw });
        }
      
        return result;
    };

    public static rgbaToHex = (r: number, g: number, b: number, a?: number) => 
        '#' + r.toString(16).padStart(2, '0') + g.toString(16).padStart(2, '0') + b.toString(16).padStart(2, '0') + (a && a !== undefined ? Math.round(a as number * 255).toString(16).padStart(2, '0') : '');

    public static hexToRgba = (hex: string) => 
        ({ 
            red: parseInt(hex.slice(1, 3), 16),
            green: parseInt(hex.slice(3, 5), 16),
            blue: parseInt(hex.slice(5, 7), 16),
            alpha: hex.length === 9 ? parseInt(hex.slice(7, 9), 16) : undefined
        });
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
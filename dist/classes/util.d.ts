import chalk from 'chalk';
import { Context, RectAlign, RectBaseline } from '..';
import { CanvasBuilder } from './builder';
export declare const fontRegex: RegExp;
export declare const rgbaRegex: RegExp;
export declare const hexRegex: RegExp;
export declare const Colors: Record<string, string>;
export declare class CanvasUtil {
    static isValidFont(font: string): boolean;
    static parseStyle(self: any, ctx: Context, canvas: CanvasBuilder, style: string | undefined | null): Promise<any>;
    static calculateRectAlignOrBaseline(XorY: number, WorH: number, AorB: RectAlign | RectBaseline): number;
    static parseFilters(filters: string): {
        filter: string;
        value: string;
        raw: string;
    }[];
    static rgbaToHex: (r: number, g: number, b: number, a?: number) => string;
    static hexToRgba: (hex: string) => {
        red: number;
        green: number;
        blue: number;
        alpha: number | undefined;
    };
}
export declare const Logger: {
    DateColor: chalk.Chalk;
    Colors: {
        INFO: chalk.Chalk;
        WARN: chalk.Chalk;
        ERROR: chalk.Chalk;
        MESSAGE: chalk.Chalk;
    };
    log(type: "INFO" | "WARN" | "ERROR" | "MESSAGE", message: string): void;
};
//# sourceMappingURL=util.d.ts.map
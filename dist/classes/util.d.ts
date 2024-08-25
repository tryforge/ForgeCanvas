import chalk from 'chalk';
export declare const fontRegex: RegExp;
export declare const rgbaRegex: RegExp;
export declare const hexRegex: RegExp;
export declare const Colors: Record<string, string>;
export declare class CanvasUtil {
    static isValidFont: (font: string) => boolean;
    static parseFilters: (filters: string) => {
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
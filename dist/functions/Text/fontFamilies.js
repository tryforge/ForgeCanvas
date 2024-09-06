"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const canvas_1 = require("@napi-rs/canvas");
exports.default = new forgescript_1.NativeFunction({
    name: '$fontFamilies',
    description: 'Returns a list of the available fonts.',
    version: '1.0.0',
    brackets: false,
    unwrap: true,
    args: [{
            name: 'separator',
            description: 'The font separator.',
            type: forgescript_1.ArgType.String,
            required: false,
            rest: false
        }],
    async execute(_, [sep]) {
        return this.success(canvas_1.GlobalFonts.families.map(x => x?.family).join(sep ?? ', '));
    }
});
//# sourceMappingURL=fontFamilies.js.map
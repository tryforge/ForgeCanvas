"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("../../");
exports.default = new forgescript_1.NativeFunction({
    name: '$registerFont',
    description: 'Registers a font.',
    version: '1.0.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'src',
            description: 'The font source path.',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false
        },
        {
            name: 'name',
            description: 'The font name.',
            type: forgescript_1.ArgType.String,
            required: false,
            rest: false
        }
    ],
    async execute(_, [src, name]) {
        return await (0, __1.registerFonts)([{ src: src, name }])
            .then(_ => this.success())
            .catch(r => this.customError(r));
    }
});
//# sourceMappingURL=registerFont.js.map
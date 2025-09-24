"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("../..");
exports.default = new forgescript_1.NativeFunction({
    name: '$filter',
    description: 'Use filters in your canvas.',
    version: '1.0.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'canvas',
            description: 'Name of the canvas.',
            type: forgescript_1.ArgType.String,
            required: false,
            rest: false
        },
        {
            name: 'method',
            description: 'The method.',
            type: forgescript_1.ArgType.Enum,
            enum: __1.FilterMethod,
            required: true,
            rest: false
        },
        {
            name: 'filter',
            description: 'Name of the filter.',
            type: forgescript_1.ArgType.Enum,
            enum: __1.Filters,
            required: false,
            rest: false
        },
        {
            name: 'value',
            description: 'Filter\'s value.',
            type: forgescript_1.ArgType.String,
            required: false,
            rest: false
        }
    ],
    execute(ctx, [name, method, filter, value]) {
        const canvas = name
            ? ctx.canvasManager?.get(name)
            : ctx.canvasManager?.lastCurrent;
        if (!canvas)
            return this.customError(__1.FCError.NoCanvas);
        const res = canvas.filter(method, filter, value);
        return this.success(typeof res === 'object'
            ? JSON.stringify(res) : res);
    }
});

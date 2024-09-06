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
            type: forgescript_1.ArgType.Number,
            required: false,
            rest: false
        }
    ],
    async execute(ctx, [name, method, filter, value]) {
        const canvas = name
            ? ctx.canvasManager?.get(name)
            : !name && ctx.canvasManager?.current?.length !== 0
                ? ctx.canvasManager?.current?.[ctx.canvasManager?.current?.length - 1] : null;
        if (!canvas)
            return this.customError('No canvas');
        const res = canvas.filter(method, filter, value);
        return this.success(typeof res === 'object' ? JSON.stringify(res) : res);
    }
});
//# sourceMappingURL=filter.js.map
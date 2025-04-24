"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: '$barOptions',
    description: 'Sets options for progress bars.',
    version: '1.2.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'options',
            description: 'Options (type:normal/ratio/pie, draw-type:fill/stroke/clear/none, background-style:color/gradient/pattern, background-radius:number, background-padding:number, background-type:fill/stroke/clear/none, radius:number, direction:horizontal/vertical, clip-radius:number, left:number).',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: true
        }
    ],
    async execute(ctx, [options]) {
        const opts = options.map(x => {
            const args = x.trim().split(':');
            return [args[0], args.slice(1)];
        });
        const barOptions = (ctx.getEnvironmentKey('progressBarOptions') ?? {});
        for (const [option, val] of opts) {
            const value = val;
            switch (option) {
                case 'type':
                    if (!['normal', 'pie', 'none'].includes(value[0]))
                        return this.customError('Invalid type');
                    barOptions.type = value[0] !== 'none'
                        ? value[0] : undefined;
                    break;
                case 'draw-type':
                    if (!['fill', 'stroke', 'clear', 'none'].includes(value[0]))
                        return this.customError('Invalid draw type');
                    barOptions['draw-type'] = value[0] !== 'none'
                        ? value[0] : undefined;
                    break;
                case 'background-style':
                    barOptions['background-style'] = value[0] !== 'none'
                        ? value.join(':') : undefined;
                    break;
                case 'background-radius': {
                    const rad = value.map(x => Number.parseFloat(x));
                    barOptions[option] = value[0] !== 'none'
                        ? rad.length === 1 ? rad[0] : rad
                        : undefined;
                    break;
                }
                case 'background-padding':
                    barOptions['background-padding'] = value[0] !== 'none'
                        ? Number.parseFloat(value[0]) : undefined;
                    break;
                case 'background-type':
                    if (!['fill', 'stroke', 'clear', 'none'].includes(value[0]))
                        return this.customError('Invalid background type');
                    barOptions['background-type'] = value[0] !== 'none'
                        ? value[0] : undefined;
                    break;
                case 'radius': {
                    const r = value.map(x => Number.parseFloat(x));
                    barOptions.radius = value[0] !== 'none'
                        ? r.length === 1 ? r[0] : r
                        : undefined;
                    break;
                }
                case 'direction':
                    if (!['horizontal', 'vertical', 'none'].includes(value[0]))
                        return this.customError('Invalid direction');
                    barOptions.direction = value[0] !== 'none'
                        ? value[0] : undefined;
                    break;
                case 'clip-radius': {
                    const clip = value.map(x => Number.parseFloat(x));
                    barOptions['clip-radius'] = value[0] !== 'none'
                        ? clip.length === 1 ? clip[0] : clip
                        : undefined;
                    break;
                }
                case 'left':
                    barOptions.left = value[0] !== 'none'
                        ? value.join(':') : undefined;
                    break;
                default: return this.customError(`Unknown bar option: ${option}`);
            }
            ;
        }
        ;
        ctx.setEnvironmentKey('progressBarOptions', barOptions);
        return this.success();
    }
});

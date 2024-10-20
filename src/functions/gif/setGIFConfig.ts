import { ArgType, NativeFunction } from '@tryforge/forgescript';
import { ColorQuantizationAlgorithm, Context, GIFManager } from '../..';
import GIFEncoder from 'gif-encoder-2';

export default new NativeFunction({
    name: '$setGIFConfig',
    aliases: ['$gifConfig', '$setGIFParams', '$gifParams'],
    description: 'Sets the params of the new gif.',
    version: '1.1.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'width',
            description: 'Width of the new gif.',
            type: ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'height',
            description: 'Height of the new gif.',
            type: ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: 'algorithm',
            description: 'The color quantization algorithm to use.',
            type: ArgType.Enum,
            enum: ColorQuantizationAlgorithm,
            required: false,
            rest: false
        }
    ],
    async execute (ctx: Context, [width, height, algorithm]) {
        if (!ctx.gifManager || !(ctx.gifManager instanceof GIFManager))
            ctx.gifManager = new GIFManager();

        const gif = new GIFEncoder(
            width,
            height,
            algorithm !== null
                ? ColorQuantizationAlgorithm[
                    (typeof algorithm === 'string'
                        ? ColorQuantizationAlgorithm[algorithm]
                        : algorithm
                    ) as ColorQuantizationAlgorithm
                ] as 'neuquant' | 'octree'
            : undefined
        );
        gif.start();

        ctx.gifManager.current.push(gif);
        return this.success();
    }
});
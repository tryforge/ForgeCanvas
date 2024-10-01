import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { WidthOrHeight } from '../..';
import { loadImage } from '@napi-rs/canvas';

export default new NativeFunction({
    name: '$imageSize',
    description: 'Returns image\'s size.',
    version: '1.1.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'path',
            description: 'The image path.',
            type: ArgType.String,
            required: true,
            rest: false
        },
        {
            name: 'property',
            description: 'The size property to return.',
            type: ArgType.Enum,
            enum: WidthOrHeight,
            required: false,
            rest: false
        }
    ],
    async execute (_, [path, property]) {
        const image = await loadImage(path, { maxRedirects: 30 });
        return this.success(property //@ts-ignore
            ? image[WidthOrHeight[
                (typeof property === 'number' ? WidthOrHeight[property] : property) as any
            ]]
            : JSON.stringify({ width: image.width, height: image.height })
        );
    }
});
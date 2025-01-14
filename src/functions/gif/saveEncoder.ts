import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { Context } from '../..';
import { writeFileSync } from 'node:fs';

export default new NativeFunction({
    name: '$saveEncoder',
    aliases: ['$downloadEncoder', '$downloadGIF', '$saveGIF', '$encoderSave', '$encoderDownload', '$gifDownload', '$gifSave'],
    description: 'Saves an Encoder GIF to a file.',
    version: '1.1.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'gif',
            description: 'Name of the Encoder.',
            type: ArgType.String,
            required: false,
            rest: false
        },
        {
            name: 'path',
            description: 'Path to a directory. (including the canvas file name)',
            type: ArgType.String,
            required: true,
            rest: false
        }
    ],
    async execute (ctx: Context, [name, path]) {
        const gif = name
            ? ctx.gifManager?.getEncoder(name)
                : !name && ctx.gifManager?.currentEncoder?.length !== 0 
                    ? ctx.gifManager?.currentEncoder?.[ctx.gifManager?.currentEncoder?.length - 1] : null;

        if (!gif) return this.customError('No gif');
        if (!path) return this.customError('No path provided');

        writeFileSync(path, gif.getBuffer());
        return this.success();
    }
});
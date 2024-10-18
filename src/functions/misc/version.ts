import { NativeFunction } from '@tryforge/forgescript';
import { version } from '../../../package.json';

export default new NativeFunction({
    name: '$canvasVersion',
    description: 'Returns the aoi.canvas version.',
    version: '1.2.0',
    brackets: false,
    unwrap: true,
    args: [],
    async execute(ctx) {
        return this.success(version);
    }
});

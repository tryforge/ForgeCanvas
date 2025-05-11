import { NativeFunction } from '@tryforge/forgescript';
import { version } from '../../../package.json';

export default new NativeFunction({
    name: '$canvasVersion',
    description: 'Returns the forge.canvas version.',
    version: '1.1.0',
    brackets: false,
    unwrap: true,
    args: [],
    execute() { return this.success(version) }
});

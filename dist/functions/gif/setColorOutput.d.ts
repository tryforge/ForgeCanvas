import { ArgType, NativeFunction } from '@tryforge/forgescript';
import { ColorOutput } from '../..';
declare const _default: NativeFunction<[{
    name: string;
    description: string;
    type: ArgType.String;
    required: false;
    rest: false;
}, {
    name: string;
    description: string;
    type: ArgType.Enum;
    enum: typeof ColorOutput;
    required: true;
    rest: false;
}], true>;
export default _default;

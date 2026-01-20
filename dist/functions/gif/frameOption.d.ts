import { ArgType, NativeFunction } from '@tryforge/forgescript';
import { FrameOption } from '../..';
declare const _default: NativeFunction<[{
    name: string;
    description: string;
    type: ArgType.String;
    required: true;
    rest: false;
}, {
    name: string;
    description: string;
    type: ArgType.Enum;
    enum: typeof FrameOption;
    required: true;
    rest: false;
}], true>;
export default _default;

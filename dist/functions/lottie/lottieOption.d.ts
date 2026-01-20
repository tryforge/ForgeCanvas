import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { LottieOption } from '../..';
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
    enum: typeof LottieOption;
    required: true;
    rest: false;
}], true>;
export default _default;

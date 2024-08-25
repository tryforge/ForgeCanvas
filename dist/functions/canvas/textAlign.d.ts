import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { textAlign } from '../..';
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
    enum: typeof textAlign;
    required: false;
    rest: false;
}], true>;
export default _default;
//# sourceMappingURL=textAlign.d.ts.map
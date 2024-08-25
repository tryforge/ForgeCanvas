import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { FilterMethod, Filters } from '../..';
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
    enum: typeof FilterMethod;
    required: true;
    rest: false;
}, {
    name: string;
    description: string;
    type: ArgType.Enum;
    enum: typeof Filters;
    required: false;
    rest: false;
}, {
    name: string;
    description: string;
    type: ArgType.Number;
    required: false;
    rest: false;
}], true>;
export default _default;
//# sourceMappingURL=filter.d.ts.map
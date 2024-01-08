import { ArgType, NativeFunction } from "forgescript";
import { TextAlign } from '../classes';
declare const _default: NativeFunction<[{
    name: string;
    description: string;
    rest: false;
    type: ArgType.String;
    required: true;
}, {
    name: string;
    description: string;
    rest: false;
    type: ArgType.Enum;
    enum: typeof TextAlign;
    required: true;
}], true>;
export default _default;
//# sourceMappingURL=setTextAlignment.d.ts.map
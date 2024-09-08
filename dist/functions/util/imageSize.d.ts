import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { WidthOrHeight } from '../..';
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
    enum: typeof WidthOrHeight;
    required: false;
    rest: false;
}], true>;
export default _default;
//# sourceMappingURL=imageSize.d.ts.map
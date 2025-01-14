import { ArgType, NativeFunction } from '@tryforge/forgescript';
import { DecoderOption } from '../..';
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
    enum: typeof DecoderOption;
    required: true;
    rest: false;
}], true>;
export default _default;
//# sourceMappingURL=GIFDecoderOption.d.ts.map
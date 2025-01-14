import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { ImageFormat } from '../..';
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
    enum: typeof ImageFormat;
    required: false;
    rest: false;
}], true>;
export default _default;
//# sourceMappingURL=canvasBuffer.d.ts.map
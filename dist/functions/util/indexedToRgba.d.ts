import { NativeFunction, ArgType } from '@tryforge/forgescript';
declare const _default: NativeFunction<[{
    name: string;
    description: string;
    type: ArgType.Json;
    required: true;
    rest: false;
}, {
    name: string;
    description: string;
    type: ArgType.Number;
    required: false;
    rest: false;
}, {
    name: string;
    description: string;
    type: ArgType.Number;
    check: (x: number) => boolean;
    required: true;
    rest: true;
}], true>;
export default _default;
//# sourceMappingURL=indexedToRgba.d.ts.map
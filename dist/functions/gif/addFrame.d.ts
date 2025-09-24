import { NativeFunction, ArgType } from '@tryforge/forgescript';
declare const _default: NativeFunction<[{
    name: string;
    description: string;
    type: ArgType.String;
    required: false;
    rest: false;
}, {
    name: string;
    description: string;
    type: ArgType.String;
    required: true;
    rest: false;
}, {
    name: string;
    description: string;
    type: ArgType.Json;
    required: false;
    rest: false;
}, {
    name: string;
    description: string;
    type: ArgType.Number;
    check: (x: number) => boolean;
    required: false;
    rest: false;
}], true>;
export default _default;

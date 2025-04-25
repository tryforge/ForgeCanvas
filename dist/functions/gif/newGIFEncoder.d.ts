import { NativeFunction, ArgType } from '@tryforge/forgescript';
declare const _default: NativeFunction<[{
    name: string;
    description: string;
    type: ArgType.String;
    required: true;
    rest: false;
}, {
    name: string;
    description: string;
    type: ArgType.Number;
    required: true;
    rest: false;
}, {
    name: string;
    description: string;
    type: ArgType.Number;
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
    type: ArgType.Unknown;
    required: false;
    rest: true;
}], false>;
export default _default;

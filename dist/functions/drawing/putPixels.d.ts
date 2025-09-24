import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { ColorDataType } from '../..';
declare const _default: NativeFunction<[{
    name: string;
    description: string;
    type: ArgType.String;
    required: false;
    rest: false;
}, {
    name: string;
    description: string;
    type: ArgType.Json;
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
    type: ArgType.Enum;
    enum: typeof ColorDataType;
    required: false;
    rest: false;
}], true>;
export default _default;

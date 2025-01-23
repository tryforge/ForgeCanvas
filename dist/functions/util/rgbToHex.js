"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const forgescript_1=require("@tryforge/forgescript"),gifsx_1=require("@gifsx/gifsx");exports.default=new forgescript_1.NativeFunction({name:"$rgbToHex",description:"Converts RGB into HEX.",version:"1.2.1",brackets:!0,unwrap:!0,args:[{name:"allowShort",description:"Whether to allow short hex output. (default: false)",type:forgescript_1.ArgType.Boolean,required:!1,rest:!1},{name:"rgba",description:"The RGB to convert into HEX.",type:forgescript_1.ArgType.Number,check:e=>e>=0&&e<=255,required:!0,rest:!0}],async execute(e,[t,o]){try{const r=(0,gifsx_1.rgbToHex)(Uint8Array.from(o),t??!1);return this.success(`[${r.map(s=>`"${s}"`).join(", ")}]`)}catch(r){return this.customError(r.toString())}}});

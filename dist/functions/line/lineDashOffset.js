"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const forgescript_1=require("@tryforge/forgescript");exports.default=new forgescript_1.NativeFunction({name:"$lineDashOffset",description:"Sets or returns the line dash offset in a canvas.",version:"1.0.0",brackets:!1,unwrap:!0,args:[{name:"canvas",description:"Name of the canvas.",type:forgescript_1.ArgType.String,required:!1,rest:!1},{name:"offset",description:"The new offset.",type:forgescript_1.ArgType.Number,required:!1,rest:!1}],async execute(e,[r,a]){const s=(r?e.canvasManager?.get(r):!r&&e.canvasManager?.current?.length!==0?e.canvasManager?.current?.[e.canvasManager?.current?.length-1]:null)?.ctx;return s?this.success(a?(s.lineDashOffset=a,void 0):s.lineDashOffset):this.customError("No canvas")}});

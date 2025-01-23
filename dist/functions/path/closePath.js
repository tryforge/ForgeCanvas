"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const forgescript_1=require("@tryforge/forgescript");exports.default=new forgescript_1.NativeFunction({name:"$closePath",aliases:["$endPath"],description:"Adds a straight line from the current point to the start of the current path.",version:"1.0.0",unwrap:!0,args:[{name:"canvas",description:"Name of the canvas.",type:forgescript_1.ArgType.String,required:!1,rest:!1}],async execute(e,[r]){const t=r?e.canvasManager?.get(r):!r&&e.canvasManager?.current?.length!==0?e.canvasManager?.current?.[e.canvasManager?.current?.length-1]:null;return t?(t.ctx.beginPath(),this.success()):this.customError("No canvas")}});

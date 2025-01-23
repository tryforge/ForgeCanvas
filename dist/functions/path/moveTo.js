"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const forgescript_1=require("@tryforge/forgescript");exports.default=new forgescript_1.NativeFunction({name:"$moveTo",description:"Begins a new path at the point specified by the given (x, y) coordinates.",version:"1.0.0",brackets:!0,unwrap:!0,args:[{name:"canvas",description:"Name of the canvas.",type:forgescript_1.ArgType.String,required:!1,rest:!1},{name:"x",description:"The X coordinate of the point.",type:forgescript_1.ArgType.Number,required:!0,rest:!1},{name:"y",description:"The Y coordinate of the point.",type:forgescript_1.ArgType.Number,required:!0,rest:!1}],async execute(e,[r,n,a]){const t=r?e.canvasManager?.get(r):!r&&e.canvasManager?.current?.length!==0?e.canvasManager?.current?.[e.canvasManager?.current?.length-1]:null;return t?(t.ctx.moveTo(n,a),this.success()):this.customError("No canvas")}});

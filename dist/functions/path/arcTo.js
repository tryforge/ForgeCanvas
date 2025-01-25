"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const forgescript_1=require("@tryforge/forgescript");exports.default=new forgescript_1.NativeFunction({name:"$arcTo",description:"Adds a circular arc in the current path.",version:"1.0.0",brackets:!0,unwrap:!0,args:[{name:"canvas",description:"Name of the canvas.",type:forgescript_1.ArgType.String,required:!1,rest:!1},{name:"x1",description:"The X coordinate of the arc's start point.",type:forgescript_1.ArgType.Number,required:!0,rest:!1},{name:"y1",description:"The Y coordinate of the arc's start point.",type:forgescript_1.ArgType.Number,required:!0,rest:!1},{name:"x2",description:"The X coordinate of the arc's end point.",type:forgescript_1.ArgType.Number,required:!0,rest:!1},{name:"y2",description:"The Y coordinate of the arc's end point.",type:forgescript_1.ArgType.Number,required:!0,rest:!1},{name:"radius",description:"The arc's radius. Must be non-negative.",type:forgescript_1.ArgType.Number,required:!0,rest:!1}],async execute(e,[r,a,s,n,i,c]){const t=r?e.canvasManager?.get(r):!r&&e.canvasManager?.current?.length!==0?e.canvasManager?.current?.[e.canvasManager?.current?.length-1]:null;return t?(t.ctx.arcTo(a,s,n,i,c),this.success()):this.customError("No canvas")}});

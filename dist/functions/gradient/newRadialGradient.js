"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const forgescript_1=require("@tryforge/forgescript"),__1=require("../..");exports.default=new forgescript_1.NativeFunction({name:"$newRadialGradient",aliases:["$createRadialGradient","$radialGradient"],description:"Creates a radial gradient.",version:"1.0.0",brackets:!0,unwrap:!0,args:[{name:"name",description:"Name of the new gradient.",type:forgescript_1.ArgType.String,required:!0,rest:!1},{name:"x1",description:"The X coordinate of the start circle.",type:forgescript_1.ArgType.Number,required:!0,rest:!1},{name:"y1",description:"The Y coordinate of the start circle.",type:forgescript_1.ArgType.Number,required:!0,rest:!1},{name:"r1",description:"The radius of the start circle.",type:forgescript_1.ArgType.Number,required:!0,rest:!1},{name:"x2",description:"The X coordinate of the end circle.",type:forgescript_1.ArgType.Number,required:!0,rest:!1},{name:"y2",description:"The Y coordinate of the end circle.",type:forgescript_1.ArgType.Number,required:!0,rest:!1},{name:"r2",description:"The radius of the end circle.",type:forgescript_1.ArgType.Number,required:!0,rest:!1},{name:"stops",description:"Color stops.",type:forgescript_1.ArgType.Number,required:!1,rest:!0}],async execute(e,[r,t,a,i,n,s,d]){return(!e.gradientManager||!(e.gradientManager instanceof __1.GradientManager))&&(e.gradientManager=new __1.GradientManager),e.gradientManager.set(r,__1.GradientType.radial,t,a,i,n,s,d),e.gradientManager.stops.forEach(o=>e.gradientManager?.get(r)?.addColorStop(...o)),this.success()}});

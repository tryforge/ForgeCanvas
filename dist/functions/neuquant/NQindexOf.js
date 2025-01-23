"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const forgescript_1=require("@tryforge/forgescript");exports.default=new forgescript_1.NativeFunction({name:"$NQindexOf",description:"Finds the best-matching index in the color map.",version:"1.2.1",brackets:!0,unwrap:!0,args:[{name:"name",description:"Name of the NeuQuant instance.",type:forgescript_1.ArgType.String,required:!0,rest:!1},{name:"r",description:"The red value.",type:forgescript_1.ArgType.Number,required:!0,rest:!1},{name:"g",description:"The green value.",type:forgescript_1.ArgType.Number,required:!0,rest:!1},{name:"b",description:"The blue value.",type:forgescript_1.ArgType.Number,required:!0,rest:!1},{name:"a",description:"The alpha value.",type:forgescript_1.ArgType.Number,required:!0,rest:!1}],async execute(r,[t,n,u,s,i]){const e=r.neuquantManager?.get(t);return e?this.success(e.indexOf(Uint8Array.from([n,u,s,i]))):this.customError("No NeuQuant instance")}});
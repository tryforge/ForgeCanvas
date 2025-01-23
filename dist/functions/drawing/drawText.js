"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const forgescript_1=require("@tryforge/forgescript"),__1=require("../..");exports.default=new forgescript_1.NativeFunction({name:"$drawText",aliases:["$placeText","$text","$writeText"],description:"Draws a filled/stroked text on a canvas.",version:"1.0.0",brackets:!0,unwrap:!0,args:[{name:"canvas",description:"Name of the canvas.",type:forgescript_1.ArgType.String,required:!1,rest:!1},{name:"type",description:"The text type.",type:forgescript_1.ArgType.Enum,enum:__1.FillOrStroke,required:!0,rest:!1},{name:"text",description:"The text to draw.",type:forgescript_1.ArgType.String,required:!0,rest:!1},{name:"font",description:"The font text. ({size}px {font name})",type:forgescript_1.ArgType.String,check:e=>__1.CanvasUtil.isValidFont(e),required:!0,rest:!1},{name:"style",description:"The style. (color/gradient/pattern)",type:forgescript_1.ArgType.String,required:!0,rest:!1},{name:"x",description:"The text start X coordinate.",type:forgescript_1.ArgType.Number,required:!0,rest:!1},{name:"y",description:"The text start Y coordinate.",type:forgescript_1.ArgType.Number,required:!0,rest:!1},{name:"maxWidth",description:"Maximum font width.",type:forgescript_1.ArgType.Number,required:!1,rest:!1},{name:"multiline",description:"Indicates if the text should be drawn in multiple lines if it exceeds the maximum width.",type:forgescript_1.ArgType.Boolean,required:!1,rest:!1},{name:"wrap",description:"Wraps the text if true.",type:forgescript_1.ArgType.Boolean,required:!1,rest:!1},{name:"lineOffset",description:"The text lines offset.",type:forgescript_1.ArgType.Number,required:!1,rest:!1}],async execute(e,[r,a,i,n,l,o,p,u,c,d,f]){const t=r?e.canvasManager?.get(r):!r&&e.canvasManager?.current?.length!==0?e.canvasManager?.current?.[e.canvasManager?.current?.length-1]:null;if(!t)return this.customError("No canvas");const s=a===__1.FillOrStroke.fill?"fillStyle":"strokeStyle",y=t.ctx[s];return t.ctx[s]=await __1.CanvasUtil.parseStyle(this,e,t,l),t.text(a,i,o,p,n,u,c,d,f),t.ctx[s]=y,this.success()}});

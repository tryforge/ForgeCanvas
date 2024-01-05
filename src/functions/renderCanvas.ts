import { AttachmentBuilder } from "discord.js"
import { ArgType, NativeFunction } from "forgescript"
import CanvasBuilder from "../classes/builder"

export default new NativeFunction({
    name: "$renderCanvas",
    version: "1.0.0",
    description: "Returns the version of ForgeDB",
    unwrap: true,
    brackets: true,
    args: [
        {
            name: "canvas",
            description: "The name of canvas to attach.",
            rest: false,
            type: ArgType.String,
            required: true,
        },
        {
            name: "name",
            description: "The file name to attach canvas with.",
            rest: false,
            type: ArgType.String,
            required: false,
        }
    ],
    execute(ctx, [canvas, name]) {
        name = name ?? canvas
        
        if (!ctx.canvases || !ctx.canvases[canvas] || !(ctx.canvases[canvas] instanceof CanvasBuilder))
          return this.customError("No canvas with provided name.");

        const attachment = new AttachmentBuilder(ctx.canvases[canvas].render(), {
            name + ".png"
        })

        ctx.container.files.push(attachment)
        return this.success()
    },
})
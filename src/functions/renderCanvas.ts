import { AttachmentBuilder } from "discord.js"
import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { ForgeCanvas } from ".."

export default new NativeFunction({
    name: "$renderCanvas",
    version: "0.1.0",
    description: "Renders and attaches the canvas.",
    unwrap: true,
    brackets: true,
    args: [
        {
        name: "canvas",
        description: "The name of the canvas where the image will be placed.",
        rest: false,
        type: ArgType.String,
        required: true,
        },
        {
            name: "name",
            description: "The name with the extension of the image to be attached as",
            rest: false,
            type: ArgType.String,
            required: true,
        }
    ],
    execute(ctx, [canvas, name]) {
        const attachment = new AttachmentBuilder(ForgeCanvas.canvases[canvas].render(),{
            name
        })
        ctx.container.files.push(attachment)
        return this.success()
    },
})
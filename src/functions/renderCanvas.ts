import { AttachmentBuilder } from "discord.js"
import { ArgType, NativeFunction } from "forgescript"
import { ForgeCanvas } from ".."

export default new NativeFunction({
    name: "$renderCanvas",
    version: "1.0.0",
    description: "Returns the version of ForgeDB",
    unwrap: true,
    brackets: true,
    args: [
        {
            name: "name",
            description: "The name with the extension of the image to be attached as",
            rest: false,
            type: ArgType.String,
            required: true,
        }
    ],
    execute(ctx, [name]) {
        const attachment = new AttachmentBuilder(ForgeCanvas.render(),{
            name
        })
        ctx.container.files.push(attachment)
        return this.success()
    },
})
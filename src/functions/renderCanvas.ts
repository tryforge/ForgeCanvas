import { AttachmentBuilder } from "discord.js"
import { NativeFunction } from "forgescript"
import { ForgeCanvas } from ".."

export default new NativeFunction({
    name: "$renderCanvas",
    version: "1.0.0",
    description: "Returns the version of ForgeDB",
    unwrap: false,
    execute(ctx) {
        const attachment = new AttachmentBuilder(ForgeCanvas.render(),{
            name: "test.png"
        })
        ctx.container.files.push(attachment)
        return this.success()
    },
})
import { ArgType, NativeFunction } from "forgescript"
import { ForgeCanvas } from ".."

export default new NativeFunction({
    name: "$createCanvas",
    version: "1.0.0",
    description: "Create new blank canvas.",
    unwrap: true,
    args: [
        {
            name: "width",
            description: "The width of the canvas",
            rest: false,
            type: ArgType.Number,
            required: true,
        },
        {
            name: "height",
            description: "The height of the canvas",
            rest: false,
            type: ArgType.Number,
            required: true,
        }
    ],
    brackets: true,
    async execute(_ctx, [width, height]) {
        await ForgeCanvas.create(width, height)
        return this.success()
    },
})
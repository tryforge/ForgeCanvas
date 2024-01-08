import { ArgType, NativeFunction } from "forgescript"
import { ForgeCanvas } from ".."
import { CanvasBuilder } from "../classes"

export default new NativeFunction({
    name: "$createCanvas",
    version: "0.1.0",
    description: "Create new blank canvas.",
    unwrap: true,
    args: [
        {
            name: "name",
            description: "The name of the canvas",
            rest: false,
            type: ArgType.String,
            required: true
        },
        {
            name: "width",
            description: "The width of the canvas",
            rest: false,
            type: ArgType.Number,
            required: true
        },
        {
            name: "height",
            description: "The height of the canvas",
            rest: false,
            type: ArgType.Number,
            required: true
        }
    ],
    brackets: true,
    async execute(_ctx, [name, width, height]) {
        if (!ForgeCanvas.canvases)
        ForgeCanvas.canvases = {};
       
        ForgeCanvas.canvases[name] = new CanvasBuilder(width, height)
        return this.success()
    },
})
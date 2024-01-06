import { ArgType, NativeFunction } from "forgescript"
import { ForgeCanvas } from ".."
import CanvasBuilder from "../classes/builder"

export default new NativeFunction({
    name: "$createCanvas",
    version: "1.0.0",
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
        if (!_ctx.canvases)
          _ctx.canvases = {};

        _ctx.canvases[name] = new CanvasBuilder(width, height)

        return this.success()
    },
})
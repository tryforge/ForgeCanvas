import { ArgType, NativeFunction } from "forgescript"
import { ForgeCanvas } from ".."
import { CanvasBuilder } from "../classes"

export default new NativeFunction({
    name: "$fillRect",
    version: "1.0.0",
    description: "Draws rect in provided canvas.",
    unwrap: true,
    brackets: true,
    args: [
        {
            name: "canvas",
            description: "The name of canvas to draw text on.",
            rest: false,
            type: ArgType.String,
            required: true
        },
        {
            name: "color",
            description: "The color of rect.",
            rest: false,
            type: ArgType.String,
            required: true
        },
        {
            name: "x",
            description: "The X position of rect.",
            rest: false,
            type: ArgType.Number,
            required: true
        },
        {
            name: "y",
            description: "The Y position of rect.",
            rest: false,
            type: ArgType.Number,
            required: true
        },
        {
            name: "width",
            description: "The rect width.",
            rest: false,
            type: ArgType.Number,
            required: true
        },
        {
            name: "height",
            description: "The rect height.",
            rest: false,
            type: ArgType.Number,
            required: true
        },
        {
            name: "radius",
            description: "The rect corners radius.",
            rest: false,
            type: ArgType.Number,
            required: true
        }
    ],
    execute(_ctx, [canvas, color, x, y, width, height, radius]) {
        if (!ForgeCanvas.canvases || !ForgeCanvas.canvases[canvas] || !(ForgeCanvas.canvases[canvas] instanceof CanvasBuilder))
          return this.customError("No canvas with provided name.");
        
        ForgeCanvas.canvases[canvas].fillRect(color, x, y, width, height)
        return this.success()
    },
})
import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { ForgeCanvas } from "..";
import { CanvasBuilder } from "../classes"

export default new NativeFunction({
    name: "$strokeRect",
    version: "0.1.0",
    description: "Draws stroke rect in provided canvas.",
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
            type: ArgType.Color,
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
            name: "strokeWidth",
            description: "The stroke width.",
            rest: false,
            type: ArgType.Number,
            required: false
        },
        {
            name: "radius",
            description: "The rect corners radius.",
            rest: false,
            type: ArgType.Number,
            required: false
        }
    ],
    execute(_ctx, [canvas, color, x, y, width, height, strokeWidth, radius]) {
        if (!ForgeCanvas.canvases || !ForgeCanvas.canvases[canvas] || !(ForgeCanvas.canvases[canvas] instanceof CanvasBuilder))
          return this.customError("No canvas with provided name.");

        ForgeCanvas.canvases[canvas].strokeRect(color, x, y, width, height, strokeWidth, radius)

        return this.success()
    },
})
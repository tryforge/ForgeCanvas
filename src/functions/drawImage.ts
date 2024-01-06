import { ArgType, NativeFunction } from "forgescript"
import { ForgeCanvas } from ".."
import { CanvasBuilder } from "../classes"

export default new NativeFunction({
    name: "$drawImage",
    version: "1.0.0",
    description: "Draws an image on canvas",
    unwrap: true,
    args: [
        {
            name: "canvas",
            description: "The name of the canvas where the image will be placed.",
            rest: false,
            type: ArgType.String,
            required: true,
        },
        {
            name: "link",
            description: "The link to the image",
            rest: false,
            type: ArgType.String,
            required: true,
        },
        {
            name: "x",
            description: "The x you want to place the image",
            rest: false,
            type: ArgType.Number,
            required: true,
        },
        {
            name: "y",
            description: "The y you want to place the image",
            rest: false,
            type: ArgType.Number,
            required: true,
        },
        {
            name: "width",
            description: "The width of the image",
            rest: false,
            type: ArgType.Number,
            required: false,
        },
        {
            name: "height",
            description: "The height of the image",
            rest: false,
            type: ArgType.Number,
            required: false,
        },
        {
            name: "radius",
            description: "The radius of image corners.",
            rest: false,
            type: ArgType.Number,
            required: false,
        }
    ],
    brackets: true,
    async execute(_ctx, [canvas, link, x, y, width, height, radius]) {
        if (!ForgeCanvas.canvases || !ForgeCanvas.canvases[canvas] || !(ForgeCanvas.canvases[canvas] instanceof CanvasBuilder))
          return this.customError("No canvas with provided name.");
        await ForgeCanvas.canvases[canvas].drawImage(link, x, y, width, height, radius);
        return this.success()
    },
})
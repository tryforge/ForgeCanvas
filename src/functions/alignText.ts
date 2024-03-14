import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { ForgeCanvas } from ".."
import { CanvasBuilder, TextAlign } from '../classes'



export default new NativeFunction({
    name: "$alignText",
    version: "0.2.0",
    description: "Change the text alignment for related functions.",
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
            name: "alignment",
            description: "The alignment that the text should follow",
            rest: false,
            type: ArgType.Enum,
            enum: TextAlign,
            required: true,
        }
    ],
    execute(_ctx, [canvas, alignment]) {
        if (!ForgeCanvas.canvases || !ForgeCanvas.canvases[canvas] || !(ForgeCanvas.canvases[canvas] instanceof CanvasBuilder))
        return this.customError("No canvas with provided name.");

        ForgeCanvas.canvases[canvas].setTextAlignment(alignment)
        return this.success()
    },
})
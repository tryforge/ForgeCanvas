import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { GlobalFonts } from "@napi-rs/canvas"

export default new NativeFunction({
    name: "$registerFont",
    version: "0.2.0",
    description: "Register a custom font.",
    unwrap: true,
    brackets: true,
    args: [
        {
        name: "fontPath",
        description: "The path of the font that you want to add.",
        rest: false,
        type: ArgType.String,
        required: true,
        },
        {
            name: "name",
            description: "The name you want to give to the font",
            rest: false,
            type: ArgType.String,
            required: true,
        }
    ],
    execute(ctx, [path, name]) {
        GlobalFonts.registerFromPath(path, name)
        return this.success()
    },
})
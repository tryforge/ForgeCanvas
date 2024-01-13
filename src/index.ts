import { ForgeClient, ForgeExtension } from "forgescript";

export class ForgeCanvas extends ForgeExtension {
    public static canvases: any

    name: string = "ForgeCanvas"
    description: string = "A fast and reliable canvas extension for Forge"
    version: string = "0.2.0"

    public constructor(){
        super()
    }

    public init(client: ForgeClient): void {
        ForgeCanvas.canvases = {};
        this.load(__dirname + "/functions")
    }
}
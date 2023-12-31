import { ForgeClient, ForgeExtension } from "forgescript";
import { CanvasBuilder } from "./classes";

export class ForgeCanvas extends ForgeExtension {
    public static canvases: any

    name: string = "ForgeCanvas"
    description: string = "A fast and reliable canvas extension for Forge"
    version: string = "1.0.0"

    public constructor(){
        super()
    }

    public init(client: ForgeClient): void {
        ForgeCanvas.canvases = {};
        this.load(__dirname + "/functions")
    }
}
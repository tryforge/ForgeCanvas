import { Canvas, Image, SKRSContext2D, createCanvas, loadImage } from "@napi-rs/canvas";
import { ForgeClient, ForgeExtension } from "forgescript";

export class ForgeCanvas extends ForgeExtension {
    name: string = "ForgeCanvas"
    description: string = "A fast and reliable canvas extension for Forge"
    version: string = "1.0.0"

    public constructor(){
        super()
    }

    init(client: ForgeClient): void {
        this.load(__dirname + "/functions")
        client.canvas = ForgeCanvas.ctx
    }
}
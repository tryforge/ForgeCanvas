import { Canvas, Image, SKRSContext2D, createCanvas, loadImage } from "@napi-rs/canvas";
import { ForgeClient, ForgeExtension } from "forgescript";

export class ForgeCanvas extends ForgeExtension {
    public static canvas: Canvas
    public static ctx: SKRSContext2D

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

    public static create(width:number, height:number){
        return this.ctx = createCanvas(width, height).getContext('2d')
    }
    public static async drawImage(image: any, dx: number, dy:number, dw?: number | null, dh?: number | null){
        image = await loadImage(image)
        return this.ctx.drawImage(image, dx, dy, (dw ?? image.width), (dh ?? image.height))
    }

    public static render(){
        return this.ctx.canvas.toBuffer('image/png')
    }
}
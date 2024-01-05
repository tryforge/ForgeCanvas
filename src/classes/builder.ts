import { Canvas, Image, SKRSContext2D, createCanvas, loadImage } from "@napi-rs/canvas";

class CanvasBuilder {
  public static ctx: SKRSContext2D
  
  public constructor(width: number, height: number) {
     this.ctx = createCanvas(width, height).getContext("2d")
  }

  public static async drawImage(image: any, x: number, y: number, width?: number | null, height?: number | null, radius?: number | null) {
    image = await loadImage(image)
    ctx.drawImage(image, x, y, (width ?? image.width), (height ?? image.height))

    return this
  }

  public static render = () => {
    return this.ctx.canvas.toBuffer("image/png")
  }
}

export default CanvasBuilder;
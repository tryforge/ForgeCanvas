import { Canvas, Image, SKRSContext2D, createCanvas, loadImage } from "@napi-rs/canvas";

class CanvasBuilder {
  public static ctx: SKRSContext2D
  
  public constructor(width: number, height: number) {
     this.ctx = createCanvas(width, height).getContext("2d")
  }

  public static async drawImage(image: any, x: number, y: number, width?: number | null, height?: number | null, radius?: number | null) {
    image  = await loadImage(image)
    width  = width ?? image.width
    height = height ?? image.height

    const ctx = this.ctx
    
    if (!radius || radius < 0) {
      ctx.drawImage(image, x, y, width, height)
    } else {
      ctx.save()
      ctx.beginPath()
      ctx.moveTo(x + radius, y)
      
      ctx.arcTo(x + width, y, x + width, y + height, radius)
      ctx.arcTo(x + width, y + height, x, y + height, radius)
      ctx.arcTo(x, y + height, x, y, radius)
      ctx.arcTo(x, y, x + width, y, radius)
      
      ctx.closePath()
      ctx.clip();
      ctx.drawImage(image, x, y, width, height);
    };

    return this
  }

  public static render = () => {
    return this.ctx.canvas.toBuffer("image/png")
  }
}

export default CanvasBuilder;
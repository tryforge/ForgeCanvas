import { Canvas, SKRSContext2D, createCanvas, loadImage } from "@napi-rs/canvas";

export class CanvasBuilder {
  public static ctx: SKRSContext2D

  public constructor(width: number, height: number) {
    CanvasBuilder.ctx = createCanvas(width, height).getContext("2d");
  }

  public drawImage = async (image: any, x: number, y: number, width?: number, height?: number, radius?: number) => {
    image = await loadImage(image)
    width = width ?? image.width as number
    height = height ?? image.height as number

    const ctx = CanvasBuilder.ctx
    
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
      ctx.clip()
      ctx.drawImage(image, x, y, width, height)
    };

    return ctx
  }

  public fillText = (text: string, x: number, y: number, font: string, color: string) => {
    const ctx = CanvasBuilder.ctx

    const oldfont = ctx.font
    const oldcolor = ctx.fillStyle
    
    ctx.font = font
    ctx.fillStyle = color
    
    ctx.fillText(text, x, y)
    
    ctx.font = oldfont
    ctx.fillStyle = oldcolor

    return ctx
  }

  public strokeText = (text: string, x: number, y: number, font: string, color: string, width: number) => {
    const ctx = CanvasBuilder.ctx

    const oldfont = ctx.font
    const oldcolor = ctx.strokeStyle
    const oldwidth = ctx.lineWidth
    
    ctx.font = font
    ctx.strokeStyle = color
    ctx.lineWidth = width
    
    ctx.strokeText(text, x, y)
    
    ctx.font = oldfont
    ctx.strokeStyle = oldcolor
    ctx.lineWidth = oldwidth

    return ctx
  }

  public fillRect = (color: string, x: number, y: number, width: number, height: number) => {
    const ctx = CanvasBuilder.ctx
    
    const oldcolor = ctx.fillStyle

    ctx.fillStyle = color
    ctx.fillRect(x, y, width, height)

    ctx.fillStyle = oldcolor

    return ctx
  }

  public strokeRect = (color: string, x: number, y: number, width: number, height: number, lineWidth: number) => {
    const ctx = CanvasBuilder.ctx
    
    const oldcolor = ctx.strokeStyle
    const oldwidth = ctx.lineWidth

    ctx.strokeStyle = color
    ctx.strokeRect(x, y, width, height)

    ctx.strokeStyle = oldcolor
    ctx.lineWidth = oldwidth

    return ctx
  }

  public render = () => {
    return CanvasBuilder.ctx.canvas.toBuffer("image/png")
  }
}
import { Canvas2DApplication, CanvasInputEvent, CanvasMouseEvent } from './base/application'
import { ISprite } from './base/sprite';

export class GameApplication extends Canvas2DApplication {
  public ctx: CanvasRenderingContext2D;
  // 中心点
  public cx: number = 0;
  public cy: number = 0;
  public sprites: ISprite[] = [];

  constructor(canvas: HTMLCanvasElement) {
    super(canvas)
    this.ctx = this.context2D as CanvasRenderingContext2D
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
  }

  public render(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    for (let i: number = 0; i < this.sprites.length; i++) {
      let sp: ISprite = this.sprites[i]
      sp.draw(this.ctx)
    }

  }

  public update(): void {}

  public addSprite(sp: ISprite): void {
    this.sprites.push(sp)
  }

  // 只有落在精灵的范围内，才允许分发点击事件
  protected dispatchClick(evt: CanvasMouseEvent): void {
    this.sprites.forEach(sp => {
      if (sp.onClick) {
        const canvasPos = evt.canvasPosition
        const { x, y } = canvasPos
        if (sp.isInSpriteArea(x, y)) {
          sp.onClick(evt)
        }
      }
    })
  }

  protected dispatchTouchStart(evt: TouchEvent): void {
    this.sprites.forEach(sp => {
      if (sp.onTouchStart) {
        sp.onTouchStart(evt)
      }
    })
  }

  protected dispatchTouchMove(evt: TouchEvent): void {
    this.sprites.forEach(sp => {
      if (sp.onTouchMove) {
        sp.onTouchMove(evt)
      }
    })
  }

  protected dispatchTouchEnd(evt: TouchEvent): void {
    this.sprites.forEach(sp => {
      if (sp.onTouchEnd) {
        sp.onTouchEnd(evt)
      }
    })
  }
}

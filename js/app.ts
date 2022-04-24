import { Canvas2DApplication } from './base/application'
import { ISprite } from './base/sprite';

export class GameApplication extends Canvas2DApplication {
  public ctx: CanvasRenderingContext2D;
  // 中心点
  public cx: number = 0;
  public cy: number = 0;
  public sprites: ISprite[] = [];

  constructor(canvas: HTMLCanvasElement) {
    super(canvas)
    this.ctx = this.context2D
  }

  public render(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    
    for (let i: number = 0; i < this.sprites.length; i++) {
      let sp: ISprite = this.sprites[i]
      sp.draw(this.ctx)
    }
    
  }

  public update(): void {
    
  }

  public addSprite(sp: ISprite): void {
    this.sprites.push(sp)
  }
}

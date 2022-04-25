
import { CanvasMouseEvent } from './application'

export interface ISprite {
  x: number;
  y: number;
  width: number;
  height: number;
  src: string;
  visible: boolean;
  scaleX?: number;
  scaleY?: number;
  isSupportTouch: boolean;


  draw: (ctx: CanvasRenderingContext2D) => void;
  isInSpriteArea: (x: number, y: number) => boolean;
  isCollideWith: (sp: Sprite) => boolean;
  onClick?: (evt: CanvasMouseEvent) => void;
  onTouchStart?: (evt: TouchEvent) => void;
  onTouchMove?: (evt: TouchEvent) => void;
  onTouchEnd?: (evt: TouchEvent) => void;
  update?(elapsedMsec: number, intervalSec: number): void;
}

export default class Sprite implements ISprite {
  public x: number = 0;
  public y: number = 0;
  public width: number = 0;
  public height: number = 0;
  public src: string = '';
  public visible: boolean = false;
  public scaleX?: number = 1;
  public scaleY?: number = 1;
  public isSupportTouch: boolean = false;
  private img: HTMLImageElement;


  onClick(evt: CanvasMouseEvent): void { }
  onTouchStart(evt: TouchEvent): void { }
  onTouchMove(evt: TouchEvent): void { }
  onTouchEnd(evt: TouchEvent): void { }

  update(elapsedMsec: number, intervalSec: number): void { }

  constructor(src?) {
    if (src) {
      this.img = new Image()
      this.src = src
      this.img.src = src
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(
      this.img,
      this.x,
      this.y,
      this.width,
      this.height
    )
  }

  /**
   * 简单的碰撞检测定义：
   * 另一个精灵的中心点处于本精灵所在的矩形内即可
   * @param{Sprite} sp: Sptite的实例
   */
  isCollideWith(sp: Sprite) {
    const spX = sp.x + sp.width / 2
    const spY = sp.y + sp.height / 2

    if (!this.visible || !sp.visible) return false

    return !!(spX >= this.x
      && spX <= this.x + this.width
      && spY >= this.y
      && spY <= this.y + this.height)
  }

  /**
   * 是否在当前精灵的点击范围中
   */
  isInSpriteArea(x: number, y: number) {
    return x > this.x
      && x < (this.x + this.width)
      && y > this.y
      && y < (this.y + this.height)
  }
}

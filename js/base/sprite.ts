
import { CanvasMouseEvent } from './application'

export interface ISprite {
  x: number;
  y: number;
  width: number;
  height: number;
  src: string;
  visible: boolean;
  
  draw: (ctx: CanvasRenderingContext2D) => void;
  onClick?: (evt: CanvasMouseEvent) => void;
  onTouchStart?: (evt: TouchEvent) => void;
  onTouchMove?: (evt: TouchEvent) => void;
  onTouchEnd?: (evt: TouchEvent) => void;
  isInSpriteArea: (x: number, y: number) => boolean;
}

export default class Sprite implements ISprite {
  public x: number = 0;
  public y: number = 0;
  public width: number = 0;
  public height: number = 0;
  public src: string = '';
  public visible: boolean = false;
  private img: HTMLImageElement;

  onClick?: (evt: CanvasMouseEvent) => void;
  onTouchStart?: (evt: TouchEvent) => void;
  onTouchMove?: (evt: TouchEvent) => void;
  onTouchEnd?: (evt: TouchEvent) => void;
  
  constructor(imgSrc = '', width = 0, height = 0, x = 0, y = 0) {
    this.img = new Image()
    this.img.src = imgSrc

    this.width = width
    this.height = height

    this.x = x
    this.y = y

  }

  draw(ctx) {
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
  isCollideWith(sp) {
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
  isInSpriteArea(x, y) {
    return x > this.x 
      && x < (this.x + this.width)
      && y > this.y
      && y < (this.y + this.height)
  }
}

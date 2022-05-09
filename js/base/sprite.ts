
import { CanvasMouseEvent } from './application'
export default class Sprite implements ISprite {
  public x: number = 0;
  public y: number = 0;
  public width: number = 0;
  public height: number = 0;
  public right: number = 0;
  public bottom: number = 0;
  public src: string = '';
  public visible: boolean = true;
  public scaleX?: number = 1;
  public scaleY?: number = 1;
  public isSupportTouch: boolean = false;
  private img: HTMLImageElement;
  public velocityX: number = 0;
  public velocityY: number = 0;


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
   * 另一个精灵的四个点是否与精灵所在的矩形发生碰撞
   * @param{Sprite} sp: Sptite的实例
   */
  isCollideWith(sp: Sprite) {

    if (!this.visible || !sp.visible) return false

    // return Math.abs(sp.x - this.x) < sp.width / 2 + this.width / 2
    //   && Math.abs(sp.y - this.y) < sp.height / 2 + this.height / 2

    // return !!(spX >= this.x
    //   && spX <= this.x + this.width
    //   && spY >= this.y
    //   && spY <= this.y + this.height)

    // return this.x >= sp.x
    //   && this.x <= sp.right
    //   && this.y >= sp.y
    //   && this.y <= sp.bottom
    const right = this.x + this.width
    const bottom = this.y + this.height
    const spRight = sp.x + sp.width
    const spBottom = sp.y + sp.height

    const leftTopCollide = this.x > sp.x && this.x < spRight && this.y > sp.y && this.y < spBottom
    const rightTopCollide = right > sp.x && right < spRight && this.y > sp.y && this.y < spBottom
    const leftBottomCollide = this.x > sp.x && this.x < spRight && bottom > sp.y && bottom < spBottom
    const rightBottomCollide = right > sp.x && right < spRight && bottom > sp.y && bottom < spBottom

    return leftTopCollide || rightTopCollide || leftBottomCollide || rightBottomCollide
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

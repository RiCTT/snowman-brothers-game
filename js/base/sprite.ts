
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
  public collideType: number | null;
  public collideSprite: Sprite | null;


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
   * 关注的是精灵本身哪个位置和其他精灵发生了碰撞
   * 比如是左上，或者右上，针对情况编写代码
   * @param sp 
   */
  isCollideWith(sp: Sprite): boolean {
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
    if (!this.visible || !sp.visible) return false
    
    const absY = Math.abs(this.y - sp.y)
    const absX = Math.abs(this.x - sp.x)
    const right = this.x + this.width
    const bottom = this.y + this.height
    const spRight = sp.x + sp.width
    const spBottom = sp.y + sp.height
  
    const leftTopCollide = this.x >= sp.x && this.x <= spRight && this.y >= sp.y && this.y <= spBottom
    const rightTopCollide = right >= sp.x && right <= spRight && this.y >= sp.y && this.y <= spBottom
    const leftBottomCollide = this.x >= sp.x && this.x <= spRight && bottom >= sp.y && bottom <= spBottom
    const rightBottomCollide = right >= sp.x && right <= spRight && bottom >= sp.y && bottom <= spBottom

    let rightCollide = right >= sp.x && right <= spRight
    && ((this.y >= sp.y && absY <= sp.height) || (this.y <= sp.y && absY <= this.height))

    let leftCollide = this.x >= sp.x && this.x <= spRight
    && ((this.y >= sp.y && absY <= sp.height) || (this.y <= sp.y && absY <= this.height))

    let topCollide = this.y >= sp.y && this.y <= spBottom
    && ((this.x >= sp.x && absX <= sp.width) || (this.x <= sp.x && absX <= this.width))

    let bottomCollide = bottom >= sp.y && bottom <= spBottom
    && ((this.x >= sp.x && absX <= sp.width) || (this.x <= sp.x && absX <= this.width))

    let collideType = (leftTopCollide && 1) 
    || (rightTopCollide && 2) 
    || (leftBottomCollide && 3)
    || (rightBottomCollide && 4) 
    || (leftCollide && 5)
    || (rightCollide && 6)
    || (topCollide && 7)
    || (bottomCollide && 8)
    || null
 
    if (collideType) {
      this.collideType = collideType
      this.collideSprite = sp
    } else {
      this.collideType = null
      this.collideSprite = null
    }
  
    return leftTopCollide || rightTopCollide || leftBottomCollide || rightBottomCollide || leftCollide || rightCollide || topCollide || bottomCollide
  }

  getCollideSprite(): Sprite | null {
    return this.collideSprite
  }
  
  
  getCollideType(sp: Sprite) {
    return this.collideType
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

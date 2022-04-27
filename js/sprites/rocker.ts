import Sprite from '../base/sprite'
import { GameApplication } from '../app'
import { vec2 } from '../utils/math2d';
export default class Rocker extends Sprite implements IRocker {
  private app: GameApplication;
  public initWidth: number = 100;
  public initHeight: number = 100;
  public initX: number = 0;
  public initY: number = 0;
  public innerX: number = 0;
  public innerY: number = 0;
  public width: number = 100;
  public height: number = 100;
  public toUpdate: boolean = false;
  public radius: number = 55;
  public innderRadius: number = 26;
  private _touched: boolean = false;
  public targetVec: vec2;

  constructor(app: GameApplication) {
    super()
    this.width = this.initWidth;
    this.height = this.initHeight;
    let x = this.radius + 20
    let y = app.canvas.height - this.radius - 20
    this.initX = x
    this.initY = y
    this.x = x
    this.y = y
    this.innerX = x
    this.innerY = y
    this.isSupportTouch = true
    this.app = app
    // this.innerX += 50
  }

  update(elapsedMesc: number, intervalSec: number) {
    if (this._touched && this.app.player && this.targetVec) {
      let x = this.app.player.x + this.targetVec.x * 2 / this.targetVec.length
      let y = this.app.player.y + this.targetVec.y * 2 / this.targetVec.length
      this.app.player.setVector(x, y)
    }
  }

  draw(ctx: CanvasRenderingContext2D): void {
    this.app.drawCircle(this.x, this.y, this.radius, 'rgba(0, 0, 0, .5)')
    this.app.drawCircle(this.innerX, this.innerY, this.innderRadius, '#ddd')

  }

  isInSpriteArea(x: number, y: number): boolean {
    let x1 = x - this.x
    let y1 = y - this.y
    let len = Math.sqrt(x1 * x1 + y1 * y1)
    return len < this.radius
  }

  onTouchStart(evt: TouchEvent): void {
    this._touched = true
  }

  onTouchMove(evt: TouchEvent): void {
    if (!this._touched) {
      return
    }
    const touch = evt.touches[0]
    const { clientX, clientY } = touch
    const v1: vec2 = new vec2(clientX - this.x, clientY - this.y)
    this.targetVec = v1
    const len = v1.normalize()
    if (len > this.radius) {
      this.innerX = this.x + v1.x * this.radius
      this.innerY = this.y + v1.y * this.radius
    } else {
      this.innerX = clientX
      this.innerY = clientY
    }
  }

  onTouchEnd(evt: TouchEvent): void {
    // 如果还有手指存在的话，默认当作轮盘上的触摸
    // 空的时候，所有触摸结束
    if (!evt.touches.length && this._touched) {
      this._touched = false
      this.innerX = this.initX
      this.innerY = this.initY
    }
  }

}
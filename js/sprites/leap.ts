import Sprite from '../base/sprite'
import LEAP_IMG_SRC from '../../images/btn-leap.png'
import { CanvasMouseEvent } from '../base/application'
import { GameApplication } from '../app'
import { getQuadraticCurvePoint, vec2 } from '../utils/math2d';

enum Direction {
  LEFT,
  CENTER,
  RIGHT
}
export default class Leap extends Sprite {
  private app: GameApplication;
  public initWidth: number = 80;
  public initHeight: number = 80;
  public initX: number = 0;
  public initY: number = 0;
  public width: number = 80;
  public height: number = 80;
  public leapLen: number = 100;
  public toUpdate: boolean = false;
  public isLeap: boolean = false;
  public t: number = 0;
  public lastStart: vec2;
  public direction: Direction;

  constructor(app: GameApplication) {
    super(LEAP_IMG_SRC)
    this.width = this.initWidth;
    this.height = this.initHeight;
    this.x = app.canvas.width - this.width - 0
    this.y = app.canvas.height - this.height - 80
    this.initX = this.x
    this.initY = this.y
    this.app = app
  }

  update(elapsedMesc: number, intervalSec: number) {
    if (this.isLeap) {
      this.changeLeap()
    }
    if (!this.toUpdate) {
      return
    }
    if (this.width > this.initWidth + 5) {
      this.width = this.initWidth
      this.height = this.initHeight
      this.x = this.initX
      this.y = this.initY
      this.toUpdate = false
    } else {
      let step = 5
      this.width += step
      this.height += step
      this.x -= (step / 2)
      this.y -= (step / 2)
    }
  }

  changeLeap() {
    if (this.t < 1 && this.lastStart) {
      console.log('direction', this.direction)
      let direction = this.direction
      let px = this.lastStart.x
      let py = this.lastStart.y
      let cx = direction === Direction.LEFT ? px - 50 : direction === Direction.RIGHT ? px + 50 : px
      let cy = py - this.leapLen
      let ex = direction === Direction.LEFT ? px - 50 : direction === Direction.RIGHT ? px + 50 : px
      let ey = py
  
      this.app.drawPoint(px, py)
      this.app.drawPoint(cx, cy)
      this.app.drawPoint(ex, ey)
  
      this.t += 0.1
      
      const point = getQuadraticCurvePoint(px, py, cx, cy, ex, ey, Math.min(this.t, 1))
      this.app.player.setVector(point.x, point.y)

    }

    if (this.t >= 1) {
      this.isLeap = false
      this.t = 0
    }
  }

  onClick(evt: CanvasMouseEvent) {
    this.lastStart = new vec2(this.app.player.x, this.app.player.y)
    const rockerPos = new vec2(this.app.rocker.innerX, this.app.rocker.innerY)
    const rockerX = this.app.rocker.x
    const isRight = rockerPos.x > rockerX 
    const isLeft = rockerPos.x < rockerX

    this.direction = isRight ? Direction.RIGHT : isLeft ? Direction.LEFT : Direction.CENTER
    
    this.isLeap = true
    this.toUpdate = true
  }
}
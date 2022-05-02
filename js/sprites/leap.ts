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
// v = gt
// const GRAVITY_FORCE = 9.81
const GRAVITY_FORCE = 0.4
export default class Leap extends Sprite {
  private app: GameApplication;
  public initWidth: number = 80;
  public initHeight: number = 80;
  public initX: number = 0;
  public initY: number = 0;
  public width: number = 80;
  public height: number = 80;
  public leapLen: number = 100;
  public t: number = 0;
  public lastStart: vec2 | null;
  public direction: Direction;
  public isClicking: boolean = false;
  public isLeaping: boolean = false;
  public vx: number = 2;
  public vy: number = 2;

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
    this.executeClick()
    this.executeLeap(intervalSec)
  }

  executeLeap(intervalSec: number) {
    if (!this.isLeaping) {
      return
    }
    const direction = this.direction

    if (this.app.player.y <= this.lastStart.y - 100) {
      this.vy *= -1
    }

    let x, y


    switch (direction) {
      case Direction.LEFT:
        x = this.app.player.x - this.vx
        y = this.app.player.y - this.vy
        break
      case Direction.CENTER:
        x = this.app.player.x
        y = this.app.player.y - this.vy
        break
      case Direction.RIGHT:
        x = this.app.player.x + this.vx
        y = this.app.player.y - this.vy
        break
    }

    for (let i = 0; i < this.app.map.mapPos.length; i++) {
      const rectangle = this.app.map.mapPos[i]
      if (y <= rectangle.bottom) {
        console.log(rectangle)
        let playR = x + this.app.player.width
        if ((x >= rectangle.left && x <= rectangle.right) || (playR >= rectangle.left && playR <= rectangle.right + 10)) {
          // console.log(rectangle)
          y = rectangle.bottom
          this.vy = Math.abs(this.vy) * -1
          break
        }
      }
    }

    this.app.player.setVector(x, y)

    // this.vy += GRAVITY_FORCE


    if (this.app.player.y >= this.lastStart.y) {
      this.isLeaping = false
      // this.vy = Math.abs(this.vy)
      this.vy = 2
      this.lastStart = null
    }
  }

  executeClick() {
    if (!this.isClicking) {
      return
    }
    if (this.width > this.initWidth + 5) {
      this.width = this.initWidth
      this.height = this.initHeight
      this.x = this.initX
      this.y = this.initY
      this.isClicking = false
    } else {
      let step = 5
      this.width += step
      this.height += step
      this.x -= (step / 2)
      this.y -= (step / 2)
    }
  }

  onClick(evt: CanvasMouseEvent) {
    this.isClicking = true
    this.isLeaping = true

    this.lastStart = new vec2(this.app.player.x, this.app.player.y)
    const rockerPos = new vec2(this.app.rocker.innerX, this.app.rocker.innerY)
    const rockerX = this.app.rocker.x
    const isRight = rockerPos.x > rockerX 
    const isLeft = rockerPos.x < rockerX
    
    this.direction = isRight ? Direction.RIGHT : isLeft ? Direction.LEFT : Direction.CENTER
  }
}
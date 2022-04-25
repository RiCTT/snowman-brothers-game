import Sprite from '../base/sprite'
// import { CanvasInputEvent } from './js/base/application'
import { GameApplication } from '@/app'
import { getDistance, vec2 } from '../utils/math2d';

export default class Player extends Sprite {
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

  constructor(app: GameApplication) {
    super()
    this.width = this.initWidth;
    this.height = this.initHeight;
    let x = 0
    let y = 0
    this.initX = x
    this.initY = y
    this.x = x
    this.y = y
    this.innerX = x
    this.innerY = y
    this.isSupportTouch = true

    this.app = app
  }

  update(elapsedMesc: number, intervalSec: number) { }

  draw(ctx: CanvasRenderingContext2D): void {
    this.app.drawRect(this.x, this.y, 50, 50)
  }
}
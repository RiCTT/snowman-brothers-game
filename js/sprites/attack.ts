import Sprite from '../base/sprite'
// import { CanvasInputEvent } from './js/base/application'
import ATTACK_IMG_SRC from '../../images/btn-attack.png'
import { CanvasMouseEvent } from '../base/application'
import { GameApplication } from '@/app'

export default class Attack extends Sprite {
  private app: GameApplication;
  public initWidth: number = 80;
  public initHeight: number = 80;
  public initX: number = 0;
  public initY: number = 0;
  public width: number = 80;
  public height: number = 80;
  public toUpdate: boolean = false;

  constructor(app: GameApplication) {
    super(ATTACK_IMG_SRC)
    this.width =  this.initWidth;
    this.height = this.initHeight;
    this.initX = this.x = app.canvas.width - this.width - 20
    this.initY = this.y = app.canvas.height - this.height - 20

    this.app = app
  }

  update(elapsedMesc: number, intervalSec: number) {
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

  onClick(evt: CanvasMouseEvent) {
    this.toUpdate = true
  }
}
import Sprite from '../base/sprite'
// import { CanvasInputEvent } from './js/base/application'
import { GameApplication } from '../app'
import { Rectangle, vec2, Size } from '../utils/math2d';
// import PLAYER_SRC from '../../images/player.gif'
import PLAYER_SRC from '../../images/player-frame.png'
export default class Player extends Sprite implements IPlayer {
  private app: GameApplication;
  public x: number = 140;
  public y: number = 20;
  public width: number = 50;
  public height: number = 50;
  public toUpdate: boolean = false;
  public rect: Rectangle;
  public boundaryRect: Rectangle;
  public direction: Number;
  public jumping: boolean = false;
  public rising: boolean = false;
  public falling: boolean = false;
  public launchPos: vec2 | null;
  public launchTime: number | undefined;

  constructor(app: GameApplication) {
    super(PLAYER_SRC)
    this.rect = new Rectangle(new vec2(this.x, this.y), new Size(this.width, this.height))
    this.boundaryRect = new Rectangle(
      new vec2(140, 0), 
      new Size(window.innerWidth - this.x - this.width - 80, window.innerHeight)
    )
    this.x = app.canvas.width * 0.5 - this.width * 0.5
    this.y = app.canvas.height - this.height
    this.app = app
    this.runCells = [
      { x: 0, y: 0, width: 75, height: 96 },
      { x: 79, y: 1, width: 77, height: 91 },
      { x: 160, y: -1, width: 74, height: 93 },
      { x: 238, y: -1, width: 74, height: 93 },
      { x: 316, y: -1, width: 74, height: 93 },
      { x: 401, y: -1, width: 74, height: 93 },
      { x: 487, y: -1, width: 74, height: 93 },
      { x: 583, y: -1, width: 74, height: 93 },
      { x: 677, y: -1, width: 74, height: 93 },
      { x: 766, y: -1, width: 74, height: 93 },
      { x: 845, y: -1, width: 74, height: 93 },
      { x: 918, y: -1, width: 74, height: 93 },
    ]
    this.jumpCells = [
      { x: 0, y: 112, width: 85, height: 130 },
      { x: 82, y: 112, width: 85, height: 130 },
      { x: 175, y:  112, width: 85, height: 130 },
      { x: 263, y:  112, width: 85, height: 130 },
    ]
    this.cells = this.runCells
    this.cellsIndex = 0
    this.app.addTimer(() => {
      console.log('run')
      this.advance()
    }, 1000 / 24 / 1000)
  }

  stopFalling() {
    this.jumping = false
    this.rising = true
    this.falling = false
    this.cells = this.runCells
    this.cellsIndex = 0
  }

  
  getJumpHorizontalVelocity() {
    let velocity = 1
    if (this.direction === 0) {
      return -velocity
    } else if (this.direction === 2) {
      return velocity
    }
    return 0
  }
  
  doFalling(disTime) {
    const vy = ((disTime - 500) / 500) * 100
    let y = this.launchPos.y - 100 + vy
    let x = this.x + this.getJumpHorizontalVelocity()
    this.setVector(x, y)
  }

  doRising(disTime) {
    const vy = disTime / 500 * 100
    let y = this.launchPos.y - vy
    let x = this.x + this.getJumpHorizontalVelocity()
    this.setVector(x, y)
  }

  advance() {
    if (this.cellsIndex + 1 === this.cells.length) {
      this.cellsIndex = 0
    } else {
      this.cellsIndex++
    }
  }

  update(elapsedMesc: number, intervalSec: number) {
    this.direction = this.app.rocker.getDirection()

    if (!this.launchTime) {
      this.launchTime = elapsedMesc
    }

    if (this.jumping) {
      const disTimeout = elapsedMesc - this.launchTime
      if (disTimeout > 1000) {
        this.stopFalling()
      } else if (disTimeout > 500) {
        this.doFalling(disTimeout)
      } else {
        this.doRising(disTimeout)
      }
    }
  }

  jump() {
    if (this.jumping) {
      return
    }
    this.cells = this.jumpCells
    this.cellsIndex = 0
    this.launchPos = new vec2(this.x, this.y)
    this.launchTime = 0
    this.jumping = true
    this.rising = true
    this.falling = false
  }

  draw(ctx: CanvasRenderingContext2D): void {
    const cell = this.cells[this.cellsIndex]
    // ctx.drawImage(this.img, this.x, this.y, this.width, this.height, )
    ctx.drawImage(this.img, cell.x, cell.y, cell.width, cell.height, this.x, this.y, this.width, this.height)
    // this.app.drawRect(this.x, this.y, this.width, this.height)
    this.app.drawLine(this.boundaryRect.left, this.boundaryRect.top, this.boundaryRect.left, this.boundaryRect.bottom, 0.5, '#ddd')
    this.app.drawLine(this.boundaryRect.right, this.boundaryRect.top, this.boundaryRect.right, this.boundaryRect.bottom, 0.5, '#ddd')
  }

  setVector(x: number, y?: number) {
    const { left, right, top, bottom } = this.boundaryRect
    
    if (x < left) {
      x = left
    }
    if (x > right - this.width) {
      x = right - this.width
    }
    if (y && y < top) {
      y = top
    }
    if (y && y > bottom - this.height) {
      y = bottom - this.height
    }

    this.x = x
    this.rect.origin.x = x

    if (y) {
      this.y = y
      this.rect.origin.y = y
    }
  }

  setSize(w: number, h: number) {
    this.width = w
    this.height = h
    this.rect.size.width = w
    this.rect.size.height = h
  }
}
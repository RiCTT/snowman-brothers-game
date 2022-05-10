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
  // public height: number = 10;
  public toUpdate: boolean = false;
  public rect: Rectangle;
  public boundaryRect: Rectangle;
  public direction: Number;
  public jumping: boolean = false;
  public rising: boolean = false;
  public falling: boolean = false;
  public launchPos: vec2 | null;
  public launchTime: number | undefined;
  public collideSprite: Sprite | null;
  public jumpHeight: number = 60;
  public defaultJumpHeight: number = 60;
  public currentPlatform: Srpite | null;

  constructor(app: GameApplication) {
    super(PLAYER_SRC)
    this.rect = new Rectangle(new vec2(this.x, this.y), new Size(this.width, this.height))
    this.boundaryRect = new Rectangle(
      new vec2(140, 0), 
      // new Size(window.innerWidth - this.x - this.width - 80, window.innerHeight)
      new Size(app.canvas.width - this.x - this.width - 80, app.canvas.height)
    )
    this.x = app.canvas.width * 0.5 - this.width * 0.5
    this.y = app.canvas.height - this.height
    // this.x = app.canvas.width * 0.5 + this.width * 2
    // this.y = 0
    this.right = this.x + this.width
    this.bottom = this.y + this.height
    this.app = app
    console.log(this.width)
    console.log(this.height)
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
      this.advance()
    }, 1000 / 24 / 1000)
  }

  stopFalling() {
    this.jumping = false
    this.rising = false
    this.falling = false
    this.cells = this.runCells
    this.cellsIndex = 0
    this.jumpHeight = this.defaultJumpHeight
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

  isCollideWithPlatform(x = this.x, y = this.y): Sprite | null {
    for(let i = 0; i < this.app.map.mapPos.length; i++) {
      const pos = this.app.map.mapPos[i]
      if (this.isCollideWith(pos)) { 
        return pos
      }
    }
    return null
  }

  calculateFinalVertical(x, y): number {
    let result = this.isCollideWithPlatform(x, y)
    let height = this.app.canvas.height
    if (result) {
      height = result.y
    }

    height = height - this.height

    return height
  }

  doFalling(disTime) {
    if (disTime < 500) {
      disTime = 500
    }
    const vy = ((disTime - 500) / 500) * Math.abs(this.jumpHeight)
    let x = this.x + this.getJumpHorizontalVelocity()
    let y = this.launchPos.y - this.jumpHeight + vy
    const shouldAtVerticalValue = this.calculateFinalVertical(x, y)
    const result = this.isCollideWithPlatform(x, y)
    if (result) {
      let collideType = this.collideType
      console.log(collideType)
      if (collideType === 5) {
        x = result.x + result.width
      } else if (collideType === 6) {
        x = result.x - this.width
      } else if (collideType === 7 || collideType === 1 || collideType === 2) {
        y = result.bottom + 1
      } else if (collideType === 8 || collideType === 3 || collideType === 4) {
        y = result.y - this.height - 1
      }
      this.falling = false
      this.rising = false
    } else if (y < shouldAtVerticalValue) {
      y--
    } else {
      this.falling = false
      this.rising = false
    }
    this.setVector(x, y)
  }

  doRising(disTime) {
    const vy = disTime / 500 * this.jumpHeight
    let x = this.x + this.getJumpHorizontalVelocity()
    let y = this.launchPos.y - vy
    const result = this.isCollideWithPlatform(x, y)
    const collideType = this.collideType
    if (result) {
      if (collideType === 7 || collideType === 1 || collideType === 2) {
        // 顶部碰到
        y = result.bottom + vy
      } else if (collideType === 8 || collideType === 3 || collideType === 4) {
        y = result.y - this.height
        // 底部碰到
      } else if (collideType === 5) {
        x = result.x + result.width
        // 左侧碰到
      } else if (collideType === 6) {
        x = result.x
        // 右侧碰到
      }
      // y = result.bottom + vy
      this.rising = false
      this.falling = true
      this.jumpHeight = this.launchPos.y - y
    }
    if (disTime >= 500) {
      this.rising = false
      this.falling = true
    }

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
    // console.log(this.x)
    // console.log(this.y)
    this.direction = this.app.rocker.getDirection()

    if (!this.launchTime) {
      this.launchTime = elapsedMesc
    }

    if (this.jumping) {
      const disTimeout = elapsedMesc - this.launchTime
      if (!this.rising && !this.falling) {
        this.stopFalling()
      } else if (this.rising) {
        this.doRising(disTimeout)
      } else if (this.falling) {
        this.doFalling(disTimeout)
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
    this.jumpHeight = this.defaultJumpHeight
    this.launchTime = 0
    this.jumping = true
    this.rising = true
    this.falling = false
  }

  draw(ctx: CanvasRenderingContext2D): void {
    const cell = this.cells[this.cellsIndex]
    ctx.drawImage(this.img, cell.x, cell.y, cell.width, cell.height, this.x, this.y, this.width, this.height)
    this.app.drawRect(this.x, this.y, this.width, this.height, '#000', false)
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
    // 不知道干嘛用的
    // this.rect.origin.x = x

    if (y) {
      this.y = y
      // this.rect.origin.y = y
    }
  }

  setSize(w: number, h: number) {
    this.width = w
    this.height = h
    this.rect.size.width = w
    this.rect.size.height = h
  }
}
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



let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')

const sp = {
  x: canvas.clientWidth * 0.5,
  y: canvas.clientHeight * 0.5,
  vx: 1,
  vy: 1,
  behaviors: [],
}

function easeOutQuad(t, b, c, d) {
  return -c * (t /= d) * (t - 2) + b;
}

function easeOutCubic(t, b, c, d) {
  return c * ((t = t / d - 1) * t * t + 1) + b;
}

const pixelPerMeter = 13

const jumpBehavior = {
  gravityForce: 9.81,
  // 多久时间完成这个行为
  duration: 1000,
  // 是否上升阶段
  isRising: false,
  isFalling: false,

  easingFunction: null,
  isStart: false,
  isEnd: false,
  endY: 0,
  startTime: 0,
  endTime: 0,
  // 期待是每一帧调用一次
  execute: function(sp, elapsedTime, intervalSec) {
    if (!this.isStart || this.isEnd) {
      return
    }
    this.startTime += (intervalSec)

    if (this.startTime > this.duration) {
      this.isStart = false
      this.isEnd = true
      return
    }
    if (this.startTime > this.duration / 2) {
      this.isRising = false
      this.isFalling = true
    } else {
      this.isRising = true
      this.isFalling = false
    }

    if (this.isRising) {
      let ey = easeOutQuad(this.startTime, canvas.clientHeight * 0.5, -100, 500)
      let ex = easeOutQuad(this.startTime, canvas.clientWidth * 0.5, 30, 500)
      sp.x = ex
      sp.y = ey
    } else if (this.isFalling) {
      let ey = easeOutCubic(this.startTime - 500, window.innerHeight * 0.5 - 100, 100, 500)
      let ex = easeOutCubic(this.startTime - 500, canvas.clientWidth * 0.5 + 30, 30, 500)
      sp.x = ex
      sp.y = ey
      console.log(window.innerHeight - ey)
    }


  },
  start: function() {
    this.startTime = 0
    this.isStart = true
  },
  pause: function() {
    this.isStart = false
  }
}

sp.behaviors.push(jumpBehavior)

let lastElapsedMesc = 0

const loop = (elapsedMesc = 0) => {
  let intervalSec = elapsedMesc - lastElapsedMesc
  lastElapsedMesc = elapsedMesc
  sp.behaviors.forEach(be => {
    be.execute(sp, elapsedMesc, intervalSec)
  })

  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

  
  ctx.beginPath()
  ctx.moveTo(0, window.innerHeight * 0.5)
  ctx.lineTo(window.innerWidth, window.innerHeight * 0.5)
  ctx.closePath()
  ctx.fillStyle = 'red'
  ctx.stroke()

  ctx.arc(sp.x, sp.y, 5, 0, Math.PI * 2)
  ctx.fillStyle = 'red'
  ctx.closePath()
  ctx.fill()


  window.requestAnimationFrame(loop)
}

console.log('start loop')
loop()

sp.behaviors[0].start()
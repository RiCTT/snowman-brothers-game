import Sprite from "../base/sprite";
import ROCKER_BG_IMG_SRC from '../../images/bg.png'
import ROCKER_ROUND_IMG_SRC from '../../images/round.png'
import { state } from '../store'
import { Vector2 } from '../base/math'

const ROCKER_BG_WIDTH = 120
const ROCKER_BG_HEIGHT = 120
const ROCKER_LEFT = 20
const ROCKER_TOP = window.innerHeight - ROCKER_BG_HEIGHT - 20
const PLAY_MAX_LEFT = 140
const PLAY_MAX_RIGHT = 450

const size = 60
const speed = 2.5

class RockerBg extends Sprite {
  constructor(player) {
    super(
      ROCKER_BG_IMG_SRC,
      ROCKER_BG_WIDTH,
      ROCKER_BG_HEIGHT,
      ROCKER_LEFT,
      ROCKER_TOP
    )
    
    this.touched = false
    this.moveX = 0
    this.player = player
  }

  draw() {
    this.drawToCanvas()
  }
}


const roundPosition = new Vector2(20 + size / 2, window.innerHeight - ROCKER_BG_HEIGHT - 20 + size / 2)
class RockerRound extends Sprite {
  constructor() {
    super(
      ROCKER_ROUND_IMG_SRC,
      size,
      size,
      // 20 + size / 2,
      // window.innerHeight - ROCKER_BG_HEIGHT - 20 + size / 2
      roundPosition.x,
      roundPosition.y
    )

    this.touched = false
    this.initEvent()
  }

  draw() {
    this.drawToCanvas()
    this.moveTimer()
  }

  moveTimer() {
    if (!this.touched || !this.moveV) return

    const newPosition = new Vector2(this.moveV.x, this.moveV.y)
    let roundX = roundPosition.x
    let roundY = roundPosition.y

    if (newPosition.length() > size) {
      const no = newPosition.normalize()
      roundX += no.x * size
      roundY += no.y * size
    } else {
      roundX += newPosition.x
      roundY += newPosition.y
    }

    this.x = roundX
    this.y = roundY
    
    let newX = state.player.x + newPosition.normalize().x * speed
    let newY = state.player.y + newPosition.normalize().y * speed
    if (newX <= PLAY_MAX_LEFT) {
      newX = PLAY_MAX_LEFT
    }
    if (newX >= PLAY_MAX_RIGHT) {
      newX = PLAY_MAX_RIGHT
    }

    if (newY <= 0) {
      newY = 0
    }

    if (newY >= window.innerHeight - state.player.height) {
      newY = window.innerHeight - state.player.height
    }

    state.player.x = newX
    state.player.y = newY
  }

  initEvent() {
    canvas.addEventListener('touchstart', (e) => {
      const touch = e.touches[0]
      const { clientX, clientY } = touch
      const isHorizontal = clientX > ROCKER_LEFT && clientX < ROCKER_LEFT + ROCKER_BG_WIDTH
      const isVeritical = clientY > ROCKER_TOP && clientY < ROCKER_TOP + ROCKER_BG_HEIGHT
      if (isHorizontal && isVeritical) {
        this.startV = new Vector2(touch.clientX, touch.clientY)
        this.touched = true
      }
      // e.stopPropagation()
      e.preventDefault()
    })

    canvas.addEventListener('touchmove', (e) => {
      if (!this.touched) {
        return
      }
      const touch = e.touches[0]
      this.moveV = new Vector2(touch.clientX - this.startV.x, touch.clientY - this.startV.y)

      // e.stopPropagation()
      e.preventDefault()
    })

    canvas.addEventListener('touchend', (e) => {
      console.log('force touchend')
      this.touched = false
      this.moveV = null

      this.x = roundPosition.x
      this.y = roundPosition.y
      // e.stopPropagation()
      e.preventDefault()
    })
  }
}

export {
  RockerBg,
  RockerRound
}
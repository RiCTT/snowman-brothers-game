import Sprite from "../base/sprite";
import ROCKER_BG_IMG_SRC from '../../images/bg.png'
import ROCKER_ROUND_IMG_SRC from '../../images/round.png'
import { state } from '../store/index'
import { Vector2 } from '../base/math'

const ROCKER_BG_WIDTH = 120
const ROCKER_BG_HEIGHT = 120

const size = 60

class RockerBg extends Sprite {
  constructor(player) {
    super(
      ROCKER_BG_IMG_SRC,
      ROCKER_BG_WIDTH,
      ROCKER_BG_HEIGHT,
      20,
      window.innerHeight - ROCKER_BG_HEIGHT - 20
    )
    
    this.touched = false
    this.moveX = 0
    this.player = player
  }

  draw() {
    this.drawToCanvas()
  }

  checkInWhere(touch) {
    const { clientX } = touch
    const { x, y, width, height } = this
    const centerX = width / 2 + x
    const centerY = height / 2 + y
    this.centerX = centerX
    this.centerY = centerY

    if (clientX > centerX) {
      return 'right'
    }
    if (clientX <= centerX) {
      return 'left'
    }
  }

  move() {
    clearTimeout(this.timer)
    this.timer = null
    this.timer = setTimeout(() => {
      console.log('timer')
      const { direction } = this
      switch(direction) {
        case 'left':
          this.moveX--
          state.player.x--
          break
        case 'right':
          this.moveX++
          state.player.x++
          break
      }
      console.log(state.player.x)
      this.move()
    }, 16)
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
    this.aniId = -1
  }

  draw() {
    this.drawToCanvas()
  }

  moveTimer() {
    this.aniId = window.requestAnimationFrame(() => {
      
    })
  }

  initEvent() {
    let start = { x: 0, y: 0 }
    let move = { x: 0, y: 0 }
    canvas.addEventListener('touchstart', (e) => {
      const touch = e.touches[0]
      start.x = touch.clientX
      start.y = touch.clientY
      this.touched = true
    })

    canvas.addEventListener('touchmove', (e) => {
      if (!this.touched) {
        return
      }
      const touch = e.touches[0]
      move.x = touch.clientX - start.x
      move.y = touch.clientY - start.y
      const newPosition = new Vector2(move.x, move.y)
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

      state.player.x = state.player.x + newPosition.normalize().x
      state.player.y = state.player.y + newPosition.normalize().y
      // state.player.y += roundY

      e.stopPropagation()
      e.preventDefault()
    })

    canvas.addEventListener('touchend', (e) => {
      this.touched = false
      this.moveX = 0

      this.x = roundPosition.x
      this.y = roundPosition.y
    })
  }
}

export {
  RockerBg,
  RockerRound
}
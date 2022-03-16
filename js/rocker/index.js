import Sprite from "../base/sprite";
import ROCKER_IMG_SRC from '../../images/rocker.png'

// const ROCKER_IMG_SRC = 'bbbrocker.png'
const ROCKER_WIDTH = 120
const ROCKER_HEIGHT = 120

export default class Rocker extends Sprite {
  constructor(player) {
    super(
      ROCKER_IMG_SRC,
      ROCKER_WIDTH,
      ROCKER_HEIGHT,
      20,
      window.innerHeight - ROCKER_HEIGHT - 20
    )
    
    this.touched = false
    this.moveX = 0
    this.player = player
    this.drawToCanvas()
    this.initEvent()
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
      const { direction } = this
      switch(direction) {
        case 'left':
          this.moveX--
          this.player.x--
          break
        case 'right':
          this.moveX++
          this.player.x++
          break
      }
      this.move()
    }, 16)
  }

  initEvent() {
    canvas.addEventListener('touchstart', (e) => {
      const touch = e.touches[0]
      this.direction = this.checkInWhere(touch)
      this.move()
      this.touched = true
    })

    canvas.addEventListener('touchmove', (e) => {
      if (!this.touched) {
        return
      }
      const touch = e.touches[0]
      this.direction = this.checkInWhere(touch)
      e.stopPropagation()
      e.preventDefault()
    })

    canvas.addEventListener('touchend', (e) => {
      this.touched = false
      clearTimeout(this.timer)
      this.timer = null
      this.moveX = 0
    })
  }
}
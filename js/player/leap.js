import Sprite from '/js/base/sprite'
import LEAP_IMG_SRC from '/images/btn-leap.png'

const WIDTH = 90
const HEIGHT = 90
const MAX_WIDTH = 100
const MAX_HEIGHT = 100

class Leap extends Sprite {
  constructor() {
    super(
      LEAP_IMG_SRC,
      WIDTH,
      HEIGHT,
      window.innerWidth - WIDTH,
      window.innerHeight - HEIGHT - 60
    )
    this.on('click', this.onClick.bind(this))
  }

  onClick() {
    this.expand = true
  }

  draw() {
    if (this.expand) {
      this.width += 2
      this.height += 2
      if (this.width >= MAX_WIDTH) {
        this.width = WIDTH
        this.expand = false
      }
      if (this.height >= MAX_HEIGHT) {
        this.height = HEIGHT
        this.expand = false
      }
    }
    this.drawToCanvas()
  }
}

export default Leap
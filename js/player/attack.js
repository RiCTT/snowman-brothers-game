import Sprite from '/js/base/sprite'
import ATTACK_IMG_SRC from '/images/btn-attack.png'

const WIDTH = 100
const HEIGHT = 100
const MAX_WIDTH = WIDTH + 10
const MAX_HEIGHT = HEIGHT + 10

class Attack extends Sprite {
  constructor(player) {
    super(
      ATTACK_IMG_SRC,
      WIDTH,
      HEIGHT,
      window.innerWidth - WIDTH - 80,
      window.innerHeight - HEIGHT - 10
    )
    this.player = player
    this.on('click', this.onClick.bind(this))
    this.initEvent()
  }

  onClick() {
    this.expand = true
    this.player && this.player.onAttack && this.player.onAttack()
  }

  initEvent() {
  }

  draw() {
    if (this.expand) {
      this.width += 2
      this.height += 2
      this.x -= 1
      this.y -= 1
      
      if (this.width >= MAX_WIDTH) {
        this.width = WIDTH
        this.x = window.innerWidth - WIDTH - 80
        this.expand = false
      }
      if (this.height >= MAX_HEIGHT) {
        this.height = HEIGHT
        this.y = window.innerHeight - HEIGHT - 10
        this.expand = false
      }
    }
    this.drawToCanvas()
  }
}

export default Attack
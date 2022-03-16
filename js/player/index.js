import Sprite from '../base/sprite'
import PLAYER_IMG_SRC from '../../images/snowsman.png'

const PLAYER_WIDTH = 60
const PLAYER_HEIGHT = 80

export default class Player extends Sprite {
  constructor() {
    super(
      PLAYER_IMG_SRC,
      PLAYER_WIDTH,
      PLAYER_HEIGHT,
      window.innerWidth / 2,
      window.innerHeight - PLAYER_HEIGHT - 20
    )

    this.drawToCanvas()
  }

  move() {
    
  }

  update() {
    console.log('update')
    console.log(this.x)
    console.log(this.y)
    this.drawToCanvas()
  }

  initEvent() {

  }
}
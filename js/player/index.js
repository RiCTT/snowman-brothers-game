import Sprite from '../base/sprite'
import PLAYER_IMG_SRC from '../../images/snowsman.png'
import { state } from '../store/index'

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
    state.player.x = window.innerWidth / 2
    state.player.y = window.innerHeight - PLAYER_HEIGHT - 20
  }

  move() {
    
  }

  draw() {
    this.x = state.player.x
    this.y = state.player.y
    this.drawToCanvas()
  }

  initEvent() {

  }
}
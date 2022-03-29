import Sprite from '../base/sprite'
import PLAYER_IMG_SRC from '../../images/snowsman-v2.png'
// import PLAYER_IMG_SRC from '../../images/snowsman.png'
import { state } from '../store/index'

const PLAYER_WIDTH = 30
const PLAYER_HEIGHT = 40

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
    state.player.width = PLAYER_WIDTH
    state.player.height = PLAYER_HEIGHT
    console.log(this.y)
  }

  move() {
    
  }

  draw() {
    this.x = state.player.x
    this.y = state.player.y
    this.drawToCanvas()
  }

  onAttack() {
    console.log('attack')
  }

  onLeap() {
    // this.y += 10
    this.y = this.y + 10
    console.log('leap')
    console.log(this.y)
    this.y = state.player.y -= 24
  }

  initEvent() {

  }
}
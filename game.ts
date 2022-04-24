// import Main from './js/main'

// import { run } from './test/testDoubleTouch.ts'

// new Main()

// run()
import { GameApplication } from './js/app'
import Sprite from './js/base/sprite'
import ATTACK_IMG_SRC from './images/btn-attack.png'

const canvas: HTMLCanvasElement = document.querySelector('#canvas')
const app: GameApplication = new GameApplication(canvas)

app.start()

app.addSprite(new Sprite(ATTACK_IMG_SRC, 100, 40, 0, 0))
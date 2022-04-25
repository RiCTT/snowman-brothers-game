import { GameApplication } from './js/app'
import Sprite from './js/base/sprite'
import ATTACK_IMG_SRC from './images/btn-attack.png'
import { CanvasInputEvent } from './js/base/application'

const canvas: HTMLCanvasElement = document.querySelector('#canvas') as HTMLCanvasElement
const app: GameApplication = new GameApplication(canvas)

app.start()


let attackBtnSp = new Sprite(ATTACK_IMG_SRC, 100, 40, 0, 0)


attackBtnSp.onClick = (evt: CanvasInputEvent): void => {
  console.log('click')
}

app.addSprite(attackBtnSp)
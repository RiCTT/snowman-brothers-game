import { GameApplication } from './js/app'
import Attack from './js/sprites/attack'
import Rocker from './js/sprites/rocker'

const canvas: HTMLCanvasElement = document.querySelector('#canvas') as HTMLCanvasElement
const app: GameApplication = new GameApplication(canvas)

const attackSp = new Attack(app)
const rockerSp = new Rocker(app)

app.start()
app.addSprite(attackSp)
app.addSprite(rockerSp)
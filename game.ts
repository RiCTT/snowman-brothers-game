import { GameApplication } from './js/app'
import Attack from './js/sprites/attack'
import Rocker from './js/sprites/rocker'
import Player from './js/sprites/player'

const canvas: HTMLCanvasElement = document.querySelector('#canvas') as HTMLCanvasElement
const app: GameApplication = new GameApplication(canvas)

const attackSp = new Attack(app)
const rockerSp = new Rocker(app)
const playerSp = new Player(app)

rockerSp.setPlayer(playerSp)

app.start()
app.addSprite(attackSp)
app.addSprite(rockerSp)
app.addSprite(playerSp)
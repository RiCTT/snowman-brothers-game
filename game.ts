import { GameApplication } from './js/app'
import Attack from './js/sprites/attack'
import Rocker from './js/sprites/rocker'
import Player from './js/sprites/player'
import Leap from './js/sprites/leap'

const canvas: HTMLCanvasElement = document.querySelector('#canvas') as HTMLCanvasElement
const app: GameApplication = new GameApplication(canvas)

const attackSp = new Attack(app)
const rockerSp = new Rocker(app)
const playerSp = new Player(app)
const leapSp = new Leap(app)

app.start()

app.setPlayer(playerSp)
app.setRocker(rockerSp)

app.addSprite(attackSp)
app.addSprite(rockerSp)
app.addSprite(playerSp)
app.addSprite(leapSp)
import { RockerBg, RockerRound } from './rocker/index'
import Player from './player/index'

export default class Main {
  constructor() {
    const canvas = document.querySelector('#canvas')
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    ctx.fillStyle = '#000'
    ctx.rect(0, 0, window.innerWidth, window.innerHeight)
    ctx.fill()
    
    window.ctx = ctx
    window.canvas = canvas

    this.aniId = 0
    this.sprites = []
    this.ctx = ctx
    this.init()
    this.loop()
  }

  init() {
    this.player = new Player()
    this.rockerBg = new RockerBg()
    this.rockerRound = new RockerRound()
  }

  loop() {
    window.cancelAnimationFrame(this.aniId++)

    window.requestAnimationFrame(() => {
      this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      ctx.fillStyle = '#000'
      ctx.rect(0, 0, window.innerWidth, window.innerHeight)
      ctx.fill()

      this.rockerBg.draw()
      this.rockerRound.draw()
      this.player.draw()
      
      this.loop()
    })
  }
}
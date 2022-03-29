import { RockerBg, RockerRound } from './rocker/index'
import Player from './player/index'
import AttackBtn from './player/attack'
import LeapBtn from '/js/player/leap'
import Ball from '/js/ball/index'

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
    this.attackBtn = new AttackBtn(this.player)
    this.leapBtn = new LeapBtn(this.player)
    
    // this.balls = []
    // let lens = 3
    // for (let i = 0; i < lens; i++) {
    //   let ball = new Ball()
    //   this.balls.push(ball)
    // }
  }

  loop() {
    window.cancelAnimationFrame(this.aniId++)

    window.requestAnimationFrame(() => {
      this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      ctx.fillStyle = '#000'
      ctx.rect(0, 0, window.innerWidth, window.innerHeight)
      ctx.fill()

      // this.balls.forEach(ball => {
      //   ball.draw()
      // })
      this.rockerBg.draw()
      this.rockerRound.draw()
      this.player.draw()
      this.attackBtn.draw()
      this.leapBtn.draw()
      
      this.loop()
    })
  }
}
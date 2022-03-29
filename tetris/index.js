import Square from './square'

class Game {
  constructor() {
    // 10 * 20
    this.gameDatas = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]
    this.gameDatasDivs = []
    this.cur = new Square({ datas: this.gameDatas })
    this.next = new Square({ datas: this.gameDatas })

    this.nextDatas = [
      [0, 2, 2, 0],
      [0, 0, 2, 2],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]
    this.nextDatasDivs = []

    this.origin = {
      x: 0,
      y: 0
    }
  }

  init() {
    this.initDivs()
    this.bindEvents()
  }

  drawDiv(datas, container, divsWrap) {
    for(let i = 0; i < datas.length; i++) {
      const divs = []
      for (let j = 0; j < datas[i].length; j++) {
        const div = document.createElement('div')
        const value = datas[i][j]
        div.style.top = i * 20 + 'px'
        div.style.left = j * 20 + 'px'
        if (value === 1) {
          div.className = 'board-item done'
        } else if (value === 2) {
          div.className = 'board-item move'
        }
        divs.push(div)
        container.appendChild(div)
      }
      divsWrap.push(divs)
    }
  }

  canLeft() {
    for (let i = 0; i < this.nextDatasDivs.length; i++) {
      for (let j = 0; j < this.nextDatasDivs[i].length; j++) {
        this.nextDatasDivs[i][j].className = 'board-item none'
        this.nextDatasDivs[i][j - 1].className = 'board-item move'
      }
    }
  }

  

  bindEvents() {
    window.addEventListener('keydown', (e) => {
      if (e.keyCode === 37) {
        // if (this.canLeft()) {
          // this.left()
        // }
        this.canLeft()
        // this.cur.left()
      } else if (e.keyCode === 39) {
        this.cur.right()
      }
    })
  }


  initDivs() {
    for (let i = 0; i < this.cur.squareDatas.length; i++) {
      for (let j = 0; j < this.cur.squareDatas[i].length; j++) {
        this.gameDatas[i][j] = this.cur.squareDatas[i][j]
      }
    }


    this.drawDiv(this.gameDatas, document.querySelector('.board'), this.gameDatasDivs)
    this.drawDiv(this.nextDatas, document.querySelector('.next-board'), this.nextDatasDivs)

  }
}

let game = new Game()
game.init()
window.game = game
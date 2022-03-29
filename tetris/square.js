class Square {
  constructor({ datas = [] }) {
    this.datas = datas
    this.x = 0
    this.y = 0
    this.squareDatas = [
      [0, 2, 2, 0],
      [0, 0, 2, 2],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ]
  }
  down() {

  }
  canDown() {

  }
  left() {
    console.log(this.canLeft())
    if (this.canLeft()) {
      this.x--
    }
  }
  canLeft() {
    for (let i = 0; i < this.squareDatas.length; i++) {
      if (this.squareDatas[i][0] !== 0 && this.x <= 0) {
        return false
      }
    }
    return true
  }
  right() {

  }
  rotate() {

  }
}

export default Square
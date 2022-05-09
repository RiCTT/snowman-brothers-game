import Sprite from '../base/sprite'
import { GameApplication } from '../app'
import { Size } from '../utils/math2d';

class BlockItem extends Sprite {
  constructor(x: number, y: number, width: number, height: number) {
    super()
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.right = this.x + this.width
    this.bottom = this.y + this.height
  }

  drawCircle(ctx) {
    ctx.save()
    ctx.beginPath()
    ctx.strokeStyle = 'red'
    ctx.arc(this.x, this.y, 5, 0, Math.PI * 2)
    ctx.stroke()
    ctx.restore()
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save()
    ctx.beginPath()
    ctx.fillStyle = '#000'
    ctx.moveTo(this.x, this.y)
    ctx.rect(this.x, this.y, this.width, this.height)
    ctx.fill()
    ctx.restore()
  }
}

export default class Map extends Sprite {
  private app: GameApplication;
  public mapData: number[][] = [];
  public mapPos: Sprite[] = [];
  public mapSize: Size;
  public size: Size;

  constructor(app: GameApplication) {
    super()
    let w = app.player.boundaryRect.width
    let h = app.player.boundaryRect.height
    this.mapSize = new Size(w, h)
    this.size = new Size(Math.floor(w / 8), Math.floor(h / 23))
    this.mapData = [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 1, 1, 0, 0, 1],
      [0, 0, 0, 0, 0, 0, 0, 0],

      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 1, 1, 0, 0, 1],
      [0, 0, 0, 0, 0, 0, 0, 0],

      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 1, 1, 0, 0, 1],
      [0, 0, 0, 0, 0, 0, 0, 0],

      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 1, 1, 0, 0, 1],
      [0, 0, 0, 0, 0, 0, 0, 0],

      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ]
    this.app = app
    this.mapPos = []
    this.initMapData()
  }

  initMapData() {
    const bx = this.app.player.boundaryRect.left
    const by = this.app.player.boundaryRect.top

    this.mapData.forEach((row, rowIndex) => {
      row.forEach((col, colIndex) => {
        if (col === 1) {
          let x = bx + colIndex * this.size.width
          let y = by + rowIndex * this.size.height
          let item = new BlockItem(x, y, this.size.width, this.size.height)
          this.mapPos.push(item)
        }
      })
    })
    console.log(this.mapPos)
  }

  update(elapsedMesc: number, intervalSec: number) {
  }

  draw(ctx: CanvasRenderingContext2D): void {
    this.mapPos.forEach(sp => {
      sp.draw(ctx)
    })
  }
}
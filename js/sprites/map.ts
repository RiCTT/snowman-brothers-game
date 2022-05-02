import Sprite from '../base/sprite'
import { GameApplication } from '../app'
import { Rectangle, Size, vec2 } from '../utils/math2d';

enum BlockType {

}

export default class Map extends Sprite {
  private app: GameApplication;
  public mapData: number[][] = [];
  public mapPos: Rectangle[] = [];
  public mapSize: Size;
  public size: Size;

  constructor(app: GameApplication) {
    super()
    let w = app.player.boundaryRect.width
    let h = app.player.boundaryRect.height
    this.mapSize = new Size(w, h)
    this.size = new Size(w / 10, h / 20)
    this.mapData = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 0, 1, 0, 1, 1, 0, 0, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 0, 1, 0, 1, 1, 0, 0, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 0, 1, 0, 1, 1, 0, 0, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 0, 1, 0, 1, 1, 0, 0, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
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
          this.mapPos.push(new Rectangle(new vec2(x, y), new Size(this.size.width, this.size.height)))
        }
      })
    })
    console.log(this.mapPos)
  }

  update(elapsedMesc: number, intervalSec: number) {
  }

  draw(ctx: CanvasRenderingContext2D): void {
    const bx = this.app.player.boundaryRect.left
    const by = this.app.player.boundaryRect.top
    
    this.mapData.forEach((row, rowIndex) => {
      row.forEach((col, colIndex) => {
        if (col === 1) {
          let x = colIndex * this.size.width
          let y = rowIndex * this.size.height
          ctx.save()
          ctx.translate(bx, by)
          ctx.beginPath()
          ctx.fillStyle = '#000'
          ctx.moveTo(x, y)
          ctx.rect(x, y, this.size.width, this.size.height)
          ctx.fill()
          ctx.restore()
        }
      })
    })
  }
}
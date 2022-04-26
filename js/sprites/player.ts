import Sprite, { ISprite } from '../base/sprite'
// import { CanvasInputEvent } from './js/base/application'
import { GameApplication } from '../app'
import { Rectangle, vec2, Size } from '../utils/math2d';

export interface IPlayer extends ISprite {
  setVector(x: number, y: number): void
  setSize(w: number, h: number): void
}

export default class Player extends Sprite implements IPlayer {
  private app: GameApplication;
  public x: number = 140;
  public y: number = 20;
  public width: number = 50;
  public height: number = 50;
  public toUpdate: boolean = false;
  public rect: Rectangle;
  public boundaryRect: Rectangle;

  constructor(app: GameApplication) {
    super()
    this.rect = new Rectangle(new vec2(this.x, this.y), new Size(this.width, this.height))
    this.boundaryRect = new Rectangle(
      new vec2(140, 0), 
      new Size(window.innerWidth - this.x - this.width - 80, window.innerHeight)
    )
    this.x = app.canvas.width * 0.5 - this.width * 0.5
    this.y = app.canvas.height * 0.5 - this.height * 0.5
    this.app = app
  }

  update(elapsedMesc: number, intervalSec: number) {}

  draw(ctx: CanvasRenderingContext2D): void {
    this.app.drawRect(this.x, this.y, this.width, this.height)
    // this.app.drawRect(this.boundaryRect.origin.x, this.boundaryRect.origin.y, this.boundaryRect.size.width, this.boundaryRect.size.height, '#000', false)
    this.app.drawLine(this.boundaryRect.left, this.boundaryRect.top, this.boundaryRect.left, this.boundaryRect.bottom, 0.5, '#f00')
    this.app.drawLine(this.boundaryRect.right, this.boundaryRect.top, this.boundaryRect.right, this.boundaryRect.bottom, 0.5, '#f00')
  }

  setVector(x: number, y: number) {
    const { left, right, top, bottom } = this.boundaryRect
    
    if (x < left) {
      x = left
    }
    if (x > right - this.width) {
      x = right - this.width
    }
    if (y < top) {
      y = top
    }
    if (y > bottom - this.height) {
      y = bottom - this.height
    }

    this.x = x
    this.y = y
    this.rect.origin.x = x
    this.rect.origin.y = y
  }

  setSize(w: number, h: number) {
    this.width = w
    this.height = h
    this.rect.size.width = w
    this.rect.size.height = h
  }
}
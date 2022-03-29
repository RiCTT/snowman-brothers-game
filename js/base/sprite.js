/**
 * 游戏基础的精灵类
 */

export const sprites = []


canvas.addEventListener('click', (e) => {
  console.log('click !!111')
  e.stopPropagation()
  e.preventDefault()
})
document.body.addEventListener('click', (e) => {
  console.log('click !!')
  e.stopPropagation()
  e.preventDefault()
})

canvas.addEventListener('touchstart', (e) => {
  console.log(e.touches)
  const { clientX, clientY } = e.touches[0]
  for(let i = 0; i < sprites.length; i++) {
    const sp = sprites[i]
    if (sp.isInBlockArea(clientX, clientY)) {
      const handlers = sp.handlers
      for (let j = 0; j < handlers.length; j++) {
        const item = handlers[j]
        if (item.name === 'click') {
          item.handler()
        }
      }
    }
  }
  e.stopPropagation()
  e.preventDefault()
})

export default class Sprite {
  constructor(imgSrc = '', width = 0, height = 0, x = 0, y = 0) {
    this.img = new Image()
    this.img.src = imgSrc

    this.width = width
    this.height = height

    this.x = x
    this.y = y

    this.visible = true
    this.handlers = []

    sprites.push(this)
  }

  on(name, handler) {
    this.handlers.push({
      name,
      handler 
    })
  }

  draw() {
    this.drawToCanvas()
  }

  /**
   * 将精灵图绘制在canvas上
   */
  drawToCanvas() {
    ctx.drawImage(
      this.img,
      this.x,
      this.y,
      this.width,
      this.height
    )
  }

  /**
   * 简单的碰撞检测定义：
   * 另一个精灵的中心点处于本精灵所在的矩形内即可
   * @param{Sprite} sp: Sptite的实例
   */
  isCollideWith(sp) {
    const spX = sp.x + sp.width / 2
    const spY = sp.y + sp.height / 2

    if (!this.visible || !sp.visible) return false

    return !!(spX >= this.x
              && spX <= this.x + this.width
              && spY >= this.y
              && spY <= this.y + this.height)
  }

  /**
   * 是否在当前精灵的点击范围中
   */
  isInBlockArea(x, y) {
    return x > this.x 
      && x < (this.x + this.width)
      && y > this.y
      && y < (this.y + this.height)
  }
}

import { Vector2 } from '/js/base/math'

const balls = []

export default class Ball {
  constructor() {
    const radius = Math.max(20, Math.floor(Math.random() * 50))
    const x = Math.max(0 + radius, Math.ceil(Math.random() * (window.innerWidth - radius)))
    const y = Math.max(0 + radius, Math.ceil(Math.random() * (window.innerHeight - radius)))
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = "#" + ((Math.random() * 0xffffff) << 0).toString(16);
    this.target = this.getRandomTarget()
    this.vx = Math.max(2, Math.floor(Math.random() * 6))
    this.vy = Math.max(2, Math.floor(Math.random() * 6))
    console.log(this)
    console.log(this.target)
    balls.push(this)
  }

  getOppositeCollideTarget(collideBall) {
    // return new Vector2(this.x + collideBall.x, this.y + collideBall.y)
    return new Vector2(-this.target.x, -this.target.y)
  }

  /**
   * 随机生成一个新的顶点，目标
   * @returns 
   */
  getRandomTarget() {
    // const horizontalValue = Math.random() > 0.5 ? 0 + this.radius : window.innerWidth - this.radius
    // const verticalValue = Math.random() > 0.5 ? 0 + this.radius : window.innerHeight - this.radius
    // if (reflect) {
    //   return new Vector2(-this.x, -this.y)
    // }
    let horizontalValue = Math.max(0 + this.radius, Math.floor(Math.random() * (window.innerWidth - this.radius)))
    let verticalValue = Math.max(0 + this.radius, Math.floor(Math.random() * (window.innerHeight - this.radius)))
    if (horizontalValue > verticalValue) {
      verticalValue = 0 + this.radius
    } else {
      horizontalValue = 0 + this.radius
    }
    return new Vector2(horizontalValue, verticalValue)
  }

  collideWith(ball) {
    const { x, y, radius } = ball

    // const distX = this.x - x
    // const distY = this.y - y
    // const dist = Math.abs(this.x - x)
    // if (dist < this.radius + radius) {
    //   console.log('碰撞')
    //   return true
    // }
    // return false
    return this.x + this.radius >= x - radius
      && this.y + this.radius >= y - radius
      && this.x - this.radius <= x + radius
      && this.y - this.radius <= y + radius
  }
  
  run() {

    for (let i = 0; i < balls.length; i++) {
      const ball = balls[i]
      if (this === ball) {
        continue
      }
      var rc = Math.sqrt(Math.pow(this.x - ball.x , 2) + Math.pow(this.y - ball.y , 2));
      if (Math.ceil(rc) < (this.radius + ball.radius)) {
      // if (this.collideWith(ball)) {
        var ax = ((this.vx - ball.vx)*Math.pow((this.x - ball.x) , 2) + (this.vy - ball.vy)*(this.x - ball.x)*(this.y - ball.y))/Math.pow(rc , 2)
        var ay = ((this.vy - ball.vy)*Math.pow((this.y - ball.y) , 2) + (this.vx - ball.vx)*(this.x - ball.x)*(this.y - ball.y))/Math.pow(rc , 2)
        this.vx = this.vx - ax
        this.vy = this.vy - ay

        ball.vx = ball.vx + ax
        ball.vy = ball.vy + ay

        var clength = ((this.radius + ball.radius) - rc) / 2
        var cx = clength * (this.x - ball.x) / rc
        var cy = clength * (this.y - ball.y) / rc
        this.x = this.x + cx
        this.y = this.y + cy
        ball.x = ball.x - cx
        ball.y = ball.y - cy
      }
    }
    
    if (this.x - this.radius <= 0 || this.x + this.radius >= window.innerWidth) {
      this.vx *= -1
    }
    if (this.y - this.radius <= 0 || this.y + this.radius >= window.innerHeight) {
      this.vy *= -1
    }
    this.x += this.vx
    this.y += this.vy
  }

  draw() {
    this.run()
    ctx.beginPath()
    ctx.fillStyle = this.color
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    ctx.fill()
    ctx.closePath()
  }
}

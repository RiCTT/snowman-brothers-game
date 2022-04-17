export const run = () => {
  console.log('here 1')
  const canvas: HTMLCanvasElement = document.querySelector('#canvas')
  const ctx = canvas.getContext('2d')

  const drawHelpInfo = (info: string): void => {
    ctx.save()
    ctx.translate(0, 0)
    ctx.fillStyle = "#fff"
    ctx.font = "30px Georgia"
    ctx.fillText(info, canvas.width * 0.5, canvas.height * 0.5, 100)
    ctx.restore()
  }

  const drawBackground = (): void => {
    ctx.save()
    ctx.fillStyle = '#000'
    ctx.rect(0, 0, window.innerWidth, window.innerHeight)
    ctx.fill()
    ctx.restore()
  }

  const clearRect = (): void => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }

  const drawTouchCircle = (touches: TouchList): void => {
    drawBackground()
    drawHelpInfo('touches: ' + touches.length)
    for (let i: number = 0; i < touches.length; i++) {
      ctx.save()
      ctx.beginPath()
      const { clientX, clientY } = touches[i]
      const radius = 50
      const grd = ctx.createRadialGradient(clientX, clientY, radius, clientX + radius, clientY + radius, radius)
      // ctx.fillStyle = 'rgba(255, 255, 255, .5)'
      grd.addColorStop(0, 'rgba(255, 255, 255, .9)')
      grd.addColorStop(0.3, 'rgba(255, 255, 255, .6)')
      grd.addColorStop(0.6, 'rgba(255, 255, 255, .3)')
      grd.addColorStop(1, 'rgba(255, 255, 255, .1)')
      ctx.fillStyle = grd
      ctx.moveTo(clientX, clientY)
      ctx.arc(clientX, clientY, radius, 0, Math.PI * 2)
      ctx.closePath()
      ctx.fill()
      ctx.restore()
    }
  }
  
  
  canvas.addEventListener('touchstart', (e) => {
    console.log('touch start')
    drawTouchCircle(e.touches)
  
  })
  
  canvas.addEventListener('touchmove', (e: TouchEvent) => {
    console.log('touch move')
    drawTouchCircle(e.touches)
  })
  
  canvas.addEventListener('touchend', (e) => {
    console.log('touch end')
    clearRect()
    drawBackground()
  })
}


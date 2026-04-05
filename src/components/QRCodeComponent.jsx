import { useEffect, useRef } from 'react'
import QRCode from 'qrcode'

const drawCenterIcon = (canvas) => {
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  const size = canvas.width
  const iconSize = Math.max(32, size * 0.18)
  const center = size / 2

  ctx.save()
  ctx.beginPath()
  ctx.fillStyle = '#ffffff'
  ctx.strokeStyle = '#764ba2'
  ctx.lineWidth = Math.max(4, iconSize * 0.08)
  ctx.arc(center, center, iconSize / 2, 0, Math.PI * 2)
  ctx.fill()
  ctx.stroke()

  ctx.fillStyle = '#764ba2'
  ctx.font = `${Math.round(iconSize * 0.38)}px Arial`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('MT', center, center + iconSize * 0.02)
  ctx.restore()
}

const QRCodeComponent = ({ value, size = 256 }) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (canvasRef.current && value) {
      QRCode.toCanvas(canvasRef.current, value, {
        width: size,
        margin: 2,
        errorCorrectionLevel: 'H',
        color: {
          dark: '#000000',
          light: '#FFFFFF',
        },
      }).then(() => {
        drawCenterIcon(canvasRef.current)
      })
    }
  }, [value, size])

  return <canvas ref={canvasRef} width={size} height={size} />
}

export default QRCodeComponent

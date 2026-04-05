import { useEffect, useRef } from 'react'
import QRCode from 'qrcode'

const QRCodeComponent = ({ value, size = 256 }) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (canvasRef.current && value) {
      QRCode.toCanvas(canvasRef.current, value, {
        width: size,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF',
        },
      })
    }
  }, [value, size])

  return <canvas ref={canvasRef} />
}

export default QRCodeComponent

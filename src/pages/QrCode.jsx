import { useState, useRef, useEffect } from 'react'
import QRCode from 'qrcode'
import '../styles/QrCode.css'

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

const QrCodePage = () => {
  const [url, setUrl] = useState('')
  const [qrLoaded, setQrLoaded] = useState(false)
  const canvasRef = useRef(null)

  useEffect(() => {
    if (url.trim()) {
      generateQrCode(url)
    } else {
      setQrLoaded(false)
    }
  }, [url])

  const generateQrCode = async (value) => {
    try {
      await QRCode.toCanvas(canvasRef.current, value, {
        errorCorrectionLevel: 'H',
        type: 'image/webp',
        quality: 0.95,
        margin: 1,
        width: 300,
        color: {
          dark: '#000000',
          light: '#FFFFFF',
        },
      })
      drawCenterIcon(canvasRef.current)
      setQrLoaded(true)
    } catch (error) {
      console.error('Lỗi tạo QR Code:', error)
      setQrLoaded(false)
    }
  }

  const downloadQrCode = () => {
    if (canvasRef.current) {
      const link = document.createElement('a')
      link.href = canvasRef.current.toDataURL()
      link.download = 'qr-code.png'
      link.click()
    }
  }

  return (
    <div className="qrcode-container">
      <div className="qrcode-wrapper">
        <h1 className="qrcode-title">Tạo Mã QR</h1>

        <div className="qrcode-input-group">
          <label htmlFor="url-input">Dán đường dẫn:</label>
          <input
            id="url-input"
            type="text"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="qrcode-input"
          />
        </div>

        <div className="qrcode-display">
          {qrLoaded && (
            <div className="qrcode-box">
              <canvas ref={canvasRef}></canvas>
              <button onClick={downloadQrCode} className="download-btn">
                Tải xuống mã QR
              </button>
            </div>
          )}
          {!qrLoaded && url.trim() && (
            <p className="qrcode-error">Lỗi: Không thể tạo mã QR</p>
          )}
          {!url.trim() && (
            <p className="qrcode-placeholder">Nhập URL để tạo mã QR</p>
          )}
        </div>

        <div className="qrcode-info">
          <p>💡 Quét mã QR này để truy cập đường dẫn đã nhập.</p>
        </div>
      </div>
    </div>
  )
}

export default QrCodePage

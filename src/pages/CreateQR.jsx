import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import QRCodeComponent from '../components/QRCodeComponent'
import { useAuth } from '../context/AuthContext'
import '../styles/CreateQR.css'

const CreateQR = () => {
  const [invitations, setInvitations] = useState([])
  const [qrUrl, setQrUrl] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { isLoggedIn, logout } = useAuth()
  const qrRef = useRef()

  // Check if admin is logged in
  if (!isLoggedIn) {
    navigate('/login')
    return null
  }

  // Load invitations from JSON file
  useEffect(() => {
    const loadInvitations = async () => {
      try {
        const response = await fetch('/invitations.json')
        if (!response.ok) throw new Error('Failed to load invitations')
        const data = await response.json()
        setInvitations(data.invitations || [])
        setError('')
      } catch (err) {
        setError('Không thể tải danh sách người mời')
        console.error('Load invitations error:', err)
      } finally {
        setLoading(false)
      }
    }

    loadInvitations()
  }, [])

  const generateQRCode = (id) => {
    // Use the deployed site URL so QR scans open the real website instead of a local preview URL
    const baseUrl = 'https://invitation-nine-beta.vercel.app'
    const invitationUrl = `${baseUrl}/?id=${encodeURIComponent(id)}`
    setQrUrl(invitationUrl)
  }

  const downloadQRCode = () => {
    if (qrRef.current) {
      const canvas = qrRef.current.querySelector('canvas') || qrRef.current
      if (canvas && canvas.toDataURL) {
        const link = document.createElement('a')
        link.href = canvas.toDataURL('image/png')
        link.download = `invitation-qr-${Date.now()}.png`
        link.click()
      }
    }
  }

  return (
    <div className="createqr-container">
      <div className="qr-content">
        <div className="qr-header">
          <h1 className="qr-title">Tạo Mã QR Lời Mời</h1>
          <button className="logout-btn" onClick={() => {
            logout()
            navigate('/login')
          }}>
            Đăng xuất
          </button>
        </div>

        <div className="qr-main">
          {/* Left Side - Recipients List */}
          <div className="recipients-section">
            <h2>Danh sách người mời</h2>

            {error && <div className="error-message">{error}</div>}

            <div className="recipients-list">
              {loading ? (
                <p className="loading-message">Đang tải...</p>
              ) : invitations.length === 0 ? (
                <p className="empty-message">Chưa có dữ liệu người mời</p>
              ) : (
                invitations.map((invitation) => (
                  <div key={invitation.id} className="recipient-item">
                    <div className="recipient-info">
                      <span className="recipient-id">ID: {invitation.id}</span>
                      <span className="recipient-name">{invitation.name}</span>
                    </div>
                    <button
                      onClick={() => generateQRCode(invitation.id)}
                      className="generate-btn"
                    >
                      Tạo QR
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Right Side - QR Code Display */}
          <div className="qr-display-section">
            <h2>QR Code</h2>

            {qrUrl ? (
              <div className="qr-result">
                <div className="qr-code-wrapper" ref={qrRef}>
                  <QRCodeComponent
                    value={qrUrl}
                    size={256}
                  />
                </div>

                <div className="qr-url">
                  <label>Đường dẫn lời mời:</label>
                  <div className="url-display">
                    <input
                      type="text"
                      readOnly
                      value={qrUrl}
                      className="url-input"
                    />
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(qrUrl)
                        alert('Đã sao chép URL vào clipboard!')
                      }}
                      className="copy-btn"
                    >
                      Sao chép
                    </button>
                  </div>
                </div>

                <button
                  onClick={downloadQRCode}
                  className="download-btn"
                >
                  Tải xuống QR
                </button>
              </div>
            ) : (
              <div className="empty-qr-state">
                <p>👆 Chọn người mời để tạo mã QR</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateQR

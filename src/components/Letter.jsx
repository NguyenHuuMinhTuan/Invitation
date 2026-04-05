import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import FloatingElements from './FloatingElements'
import '../styles/Letter.css'

const Letter = ({ recipientName = 'Guest', invitationId = null }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    // Start showing the letter after envelope animation
    const timer1 = setTimeout(() => setIsVisible(true), 200)
    // Start showing content after letter rises
    const timer2 = setTimeout(() => setShowContent(true), 1200)
    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [])

  return (
    <div className="letter-container">
      <FloatingElements />
      <div className="letter-envelope-background">
        <div className="paper-wrapper">
          <div className={`paper ${isVisible ? 'rise' : ''}`}>
            <div className="letter-medal" />
            <div className={`letter-content ${showContent ? 'visible' : ''}`}>
              {/* Header */}
              <div className="letter-header">
                <span className="letter-subtitle">THƯ MỜI</span>
                <h1 className="recipient-name">Kính gửi {recipientName},</h1>
              </div>

              {/* Body */}
              <div className="letter-body">
                <p className="body-text">
                  Lời đầu tiên, tôi xin gửi đến bạn lời chào trân trọng và lời chúc sức khỏe.
                </p>
                <p className="body-text">
                  Sau một chặng đường học tập và nỗ lực, tôi rất vui mừng được thông báo rằng
                  mình sẽ tham dự lễ tốt nghiệp. Đây là một dấu mốc quan trọng, và tôi sẽ rất hạnh
                  phúc nếu có sự hiện diện của bạn trong khoảnh khắc ý nghĩa này.
                </p>
                <p className="body-text">
                  <strong>Thời gian:</strong> 8h00 sáng, ngày 19 tháng 4 năm 2026.
                  <br />
                  <strong>Địa điểm:</strong> 371 Nguyễn Kiệm, Phường 3, Quận Gò Vấp, TP.HCM (Tòa Audora).
                </p>
                <p className="body-text">
                  Sự có mặt của bạn sẽ là niềm vinh dự và động lực lớn đối với tôi trong ngày
                  đặc biệt này. Xin chân thành cảm ơn và rất mong được đón tiếp bạn.
                </p>
                <p className="body-text">
                  Mong bạn dành chút thời gian đến chung vui cùng gia đình và bạn bè,
                  cùng trao nhau những lời chúc, kỷ niệm tươi sáng và niềm hy vọng mới.
                </p>
                <p className="body-text">
                  Vui lòng xác nhận trước ngày 15 tháng 4 để tôi chuẩn bị chu đáo nhất cho buổi lễ.
                  Sự hiện diện của bạn sẽ làm cho buổi ngày càng thêm trọn vẹn và ấm áp.
                </p>
              </div>

              {/* Footer */}
              <div className="letter-footer">
                <p className="regards">Best regards,</p>
                <p className="signature">Minh Tuấn</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Letter

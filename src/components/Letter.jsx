import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
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

  const handleResponse = () => {

  const getRandomPosition = () => {
    const positions = ['top', 'top-start', 'top-end', 'center', 'bottom', 'bottom-start', 'bottom-end']
    return positions[Math.floor(Math.random() * positions.length)]
  }

  const askAgain = () => {
    Swal.fire({
      title: 'Bạn có muốn tham dự không? 🥺',
      text: 'Đi cho vui nhaaaa 😆',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Đồng ý ❤️',
      cancelButtonText: 'Không 😢',
      position: getRandomPosition(),
      allowOutsideClick: false,
      backdrop: true,
      showClass: {
        popup: 'animate__animated animate__zoomIn'
      },
      hideClass: {
        popup: 'animate__animated animate__zoomOut'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: '🎉 Tuyệt vời!',
          text: 'Hẹn gặp bạn tại lễ tốt nghiệp!',
          icon: 'success'
        }).then(() => {
          navigate('/thank-you')
        })
      } else {
        askAgain()
      }
    })
    }   
      askAgain()
  }

  const getRandomPosition = () => {
    const positions = ['top', 'top-start', 'top-end', 'center', 'bottom', 'bottom-start', 'bottom-end']
    return positions[Math.floor(Math.random() * positions.length)]
  }

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
                  <strong>Thời gian:</strong> 12h00 trưa, ngày 19 tháng 4 năm 2026.
                  <br />
                  <strong>Địa điểm:</strong> 371 Nguyễn Kiệm, Phường 3, Quận Gò Vấp, TP.HCM (Tòa Adora).
                </p>
                <p className="body-text">
                  Sự có mặt của bạn sẽ là niềm vinh dự và động lực lớn đối với tôi trong ngày
                  đặc biệt này. Xin chân thành cảm ơn và rất mong được đón tiếp bạn.
                </p>
                <p className="body-text">
                  Mong bạn dành chút thời gian đến chung vui cùng gia đình và bạn bè,
                  cùng trao nhau những lời chúc, kỷ niệm tươi sáng và niềm hy vọng mới.
                   Sự hiện diện của bạn sẽ làm cho buổi ngày càng thêm trọn vẹn và ấm áp.
                </p>
              </div>

              {/* Footer */}
              <div className="letter-footer">
            
                <p className="regards">Best regards,</p>
                <p className="signature">Minh Tuấn</p>
                 <button className="response-btn" onClick={handleResponse}>
                 Phản hồi 💌
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Letter

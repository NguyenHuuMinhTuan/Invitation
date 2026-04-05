import { useState } from 'react'
import '../styles/Envelope.css'

const Envelope = ({ recipientName = 'Guest', onClick }) => {
  const [isOpening, setIsOpening] = useState(false)

  const handleClick = () => {
    setIsOpening(true)
    setTimeout(() => {
      onClick()
    }, 1500) // Wait for envelope animation to complete
  }

  return (
    <div className="envelope-container">
      <div className={`envelope ${isOpening ? 'opening' : ''}`} onClick={handleClick}>
        <div className="envelope-body">
          <div className="envelope-front">
            <div className="envelope-inner">
              <div className="inner-letter-title">THƯ MỜI</div>
              <div className="envelope-info-lines">
                <div className="envelope-info-item">
                  <span className="info-label">From :</span>
                  <span className="info-value">Minh Tuấn</span>
                </div>
                <div className="envelope-info-item">
                  <span className="info-label">To :</span>
                  <span className="info-value">{recipientName}</span>
                </div>
              </div>
            </div>
            <div className="envelope-flap"></div>
            <div className="envelope-bottom"></div>
            <div className="envelope-stamp">
              <div className="stamp-circle">
                <span className="stamp-text">TỐT NGHIỆP</span>
              </div>
            </div>
            <div className="wax-seal">
              <span className="wax-seal-text">MỞ</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Envelope

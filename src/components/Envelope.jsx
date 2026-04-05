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
              <div className="airmail-from">
                <span className="airmail-title">From</span>
                <span className="airmail-name">Minh Tuấn</span>
              </div>

              <div className="airmail-plane">
                <svg viewBox="0 0 64 64" aria-hidden="true">
                  <path d="M10 32 L54 8 L44 32 L54 56 Z" fill="#0c2461"/>
                  <path d="M14 32 L54 14 L50 32 L54 50 Z" fill="none" stroke="#ff2d55" strokeWidth="3"/>
                  <path d="M24 32 L46 28" stroke="#0c2461" strokeWidth="3" strokeLinecap="round"/>
                </svg>
                <div className="airmail-plane-text">Air Mail</div>
              </div>

              <div className="airmail-to">
                <span className="airmail-title">To</span>
                <span className="airmail-name">{recipientName}</span>
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
              <span className="wax-seal-heart">♥</span>
              <span className="wax-seal-text">MỞ</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Envelope

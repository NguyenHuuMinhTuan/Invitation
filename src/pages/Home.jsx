import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Envelope from '../components/Envelope'
import Letter from '../components/Letter'
import FloatingElements from '../components/FloatingElements'
import '../styles/Home.css'

const Home = () => {
  const [isOpened, setIsOpened] = useState(false)
  const [recipientName, setRecipientName] = useState('Guest')
  const [invitationId, setInvitationId] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()

  // Load invitation data from query parameter
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const id = searchParams.get('id')

    if (id) {
      setInvitationId(id)
      loadInvitationName(id)
    }
  }, [location.search])

  const loadInvitationName = async (id) => {
    try {
      const response = await fetch('/invitations.json')
      if (!response.ok) throw new Error('Failed to load invitations')
      const data = await response.json()
      
      const invitation = data.invitations.find(inv => inv.id === id)
      if (invitation) {
        setRecipientName(invitation.name)
      } else {
        setRecipientName('Guest')
      }
    } catch (error) {
      console.error('Load invitation error:', error)
      setRecipientName('Guest')
    }
  }

  const handleEnvelopeClick = () => {
    setIsOpened(true)
  }

  if (isOpened) {
    return <Letter recipientName={recipientName} invitationId={invitationId} />
  }

  return (
    <div className="home-container">
      <FloatingElements />
      <div className="home-content">
        <h1 className="home-title">Lễ Tốt Nghiệp</h1>
        <p className="home-subtitle">
          Một lời mời đặc biệt đang chờ bạn bên trong phong bì tinh tế này
        </p>
        <p className="home-instruction">
          Nhấp vào phong bì để thấy được sự bât ngờ bên trong! 🎉
        </p>
        <Envelope recipientName={recipientName} onClick={handleEnvelopeClick} />
      </div>
    </div>
  )
}

export default Home

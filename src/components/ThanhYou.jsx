const ThankYou = () => {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>🎉 Cảm ơn bạn!</h1>
        
        <p style={styles.subtitle}>
          Bạn đã đồng ý tham dự lễ tốt nghiệp ❤️
        </p>

        <div style={styles.divider}></div>

        <p style={styles.text}>
          📍 <strong>Địa điểm gửi xe:</strong>
        </p>

        <ul style={styles.list}>
          <li>Gửi trong <b>Trường Đại học Gia Định</b> (khuyến khích 👍)</li>
          <li>Hoặc gửi tại khu vực gần <b>nhà hàng Adora</b></li>
        </ul>

        <img
          src="/src/assets/park.png"
          alt="Nơi gửi xe"
          style={styles.image}
        />

        <p style={styles.footer}>
          Hẹn gặp bạn tại buổi lễ nha 🎓✨
        </p>
      </div>
    </div>
  )
}

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    fontFamily: 'sans-serif'
  },
  card: {
    background: '#fff',
    padding: '40px',
    borderRadius: '20px',
    width: '400px',
    textAlign: 'center',
    boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
  },
  title: {
    fontSize: '28px',
    marginBottom: '10px'
  },
  subtitle: {
    fontSize: '16px',
    color: '#555'
  },
  divider: {
    height: '1px',
    background: '#eee',
    margin: '20px 0'
  },
  text: {
    textAlign: 'left',
    fontSize: '15px'
  },
  list: {
    textAlign: 'left',
    paddingLeft: '20px',
    marginBottom: '20px',
    color: '#444'
  },
  image: {
    width: '100%',
    borderRadius: '12px',
    marginBottom: '15px'
  },
  footer: {
    marginTop: '10px',
    fontWeight: 'bold',
    color: '#333'
  }
}

export default ThankYou
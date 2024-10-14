

const Notification = ({ message, type }) => {
    if (message === null) {
      return null
    }

    const notificationClass = type === 'error' ? 'error' : 'information'
  
    return (
        <div className={`notification ${notificationClass}`}>
        {message}
      </div>
    )
  }

export default Notification
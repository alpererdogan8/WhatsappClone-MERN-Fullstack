import React from 'react'

const DmItem = ({ whoIs, username, message }) => {
  const div = <div className="direct-msg-name">{username}</div>
  const name = whoIs === 'friend' ? div : ''
  const style = whoIs === 'friend' ? 'friend-msg' : 'me-msg'

  return (
    <div className={`direct-msg ${style} `}>
      <span className={`${style}-tab`} style={{ borderTopColor: style }}></span>
      {name}
      <div className="direct-msg-content">{message}</div>
      <div className="direct-msg-time">01.43</div>
    </div>
  )
}

export default DmItem

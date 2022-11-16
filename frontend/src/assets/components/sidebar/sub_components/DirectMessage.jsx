import React from 'react'
import ProfilePhoto from '../../global_components/ProfilePhoto'

const DirectMessage = ({ d }) => {
  return (
    <div href={d} className="sidebar-item">
      <div className="profile-picture">
        <ProfilePhoto />
      </div>

      <div className="message-article">
        <div className="message-info">
          <div className="message-name">Lorem Ipsum {d}</div>
          <div className="message-time">15:09</div>
        </div>
        <div className="message-content">Lorem: Lorem ipsum dolor sit...</div>
      </div>
    </div>
  )
}

export default DirectMessage
